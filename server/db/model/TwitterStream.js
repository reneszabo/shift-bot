var mongoose = require('mongoose');

// Create a new schema for our tweet data
var schema = new mongoose.Schema({
  term: String
});

schema.statics.getTweets = function(page, skip, callback) {
  var tweets = [];
  var start = (page * 10) + (skip * 1);
  // Query the db, using skip and limit to achieve page chunks
  TwitterStream.find(
    {},
    'twid active author avatar body date screenname',
    {skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err, docs) {
    // If everything is cool...
    if (!err) {
      tweets = docs;  // We got tweets
      tweets.forEach(function(tweet) {
        tweet.active = true; // Set them to active
      });
    }
    // Pass them back to the specified callback
    callback(tweets);
  });
};


// Return a Tweet model based upon the defined schema
module.exports = TwitterStream = mongoose.model('TwitterStream', schema);
