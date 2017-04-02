module.exports = function(io) {
  var Tweet = require('../db/model/Tweet');
  var TwitterStream = require('../db/model/TwitterStream');
  const express = require('express');
  const router = express.Router();
  const Twitter = require('twitter');
  const Slack = require('../services/slack');
  const uuidV1 = require('uuid/v1');
  const globalVariables = require('./../global-variables');
  var slack = new Slack();
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  var arrayOfStream = [];
  // ENDPOINTS ROUTES
  router.get('/', function(req, res) {
    res.json('api twitter works');
  });
  router.route('/listen')
    .get(function(req, res) {
      res.json(arrayOfStream);
    })
    .post(function(req, res) {
      console.log(req);
      var term = req.body.term || void 0;
      if (term) {
        var twitterStreamEntity = new TwitterStream({term: term});
        var streamObject = startStream(term);
        res.json({id: streamObject.id, term: streamObject.term});
      } else {
        res.json({error: 'term not set'});
      }
    })
    .delete(function(req, res) {
      console.log(req);
      var id = req.body.id || void 0;
      if (id) {
        stopStream(id);
      }
      res.json({message: 'stoping listener - ' + id});
    });

  router.route('/callback')
    .get(function(req, res) {
      console.log('Twitter - get callback');
      console.log(req);
      res.json({message: 'hey get'});
    })
    .post(function(req, res) {
      console.log('Twitter - post callback');
      console.log(req);
      res.json({message: 'hey post'});
    });

  // STREAMS
  function stopStream(streamId) {
    if (streamId !== void 0) {
      var stream;
      for (var i = arrayOfStream.length - 1; i >= 0; i--) {
        if (arrayOfStream[i].id === streamId) {
          stream = arrayOfStream[i].stream;
          arrayOfStream.splice(i, 1);
          break;
        }
      }
      if (stream) {
        stream.destroy();
      }
    }
  }
  function startStream(term) {
    if (term === void 0) {
      return null;
    }
    stopStream(currentStream);
    var currentStream = client.stream('statuses/filter', {track: term});
    currentStream.on('data', streamSuccessHandler);
    currentStream.on('error', streamErrorHandler);
    var streamObject = {id: uuidV1(), stream: currentStream, term: term};
    arrayOfStream.push(streamObject);
    return streamObject;
  }
  function streamSuccessHandler(data) {
    var tweet = {
      twid: data.id,
      active: false,
      author: data.user.name,
      avatar: data.user.profile_image_url,
      body: data.text,
      date: data.created_at,
      screenname: data.user.screen_name
    };
    // Create a new model instance with our object
    var tweetEntry = new Tweet(tweet);
    // Save 'er to the database
    tweetEntry.save(function(err) {
      if (!err) {
        // If everything is cool, socket.io emits the tweet.
        io.emit('tweet', tweet);
        if (globalVariables.slackActive) {
          slack.sendTweet(tweet);
        }
        //
      }
    });
  }
  function streamErrorHandler(error) {
    console.log(error);
    // throw error;
  }

  return router;
};
