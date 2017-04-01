module.exports = function(io) {
  var Tweet = require('../db/model/Tweet');
  const express = require('express');
  const router = express.Router();
  const Twitter = require('twitter');
  const Slack = require('../services/slack');
  var slack = new Slack();
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  var currentStream;
  // ENDPOINTS ROUTES
  router.get('/', function(req, res) {
    res.json('api twitter works');
  });
  router.route('/listen')
    .get(function(req, res) {
      console.log('Twitter - get listen');
      var term = req.query.term || void 0;
      startStream(term);
      res.json({message: term});
    })
    .post(function(req, res) {
      var term = req.query.term || void 0;
      res.json({message: term});
    }
    .delete(function(req, res) {
      stopStream(currentStream);
      res.json({message: 'stoping listeners'});
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
  function stopStream(stream) {
    if (stream !== void 0) {
      stream.destroy();
    }
  }
  function startStream(term) {
    if (term === void 0) {
      return null;
    }
    stopStream(currentStream);
    currentStream = client.stream('statuses/filter', {track: term});
    currentStream.on('data', streamSuccessHandler);
    currentStream.on('error', streamErrorHandler);
  }
  function streamSuccessHandler(data) {
    // console.log(data);
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
        slack.sendTweet(tweet);
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
