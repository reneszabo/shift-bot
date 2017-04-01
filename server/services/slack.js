const request = require('request');
var incomingURL = process.env.SLACK_INCOMING_URL;
/**
 *
 * @param {String} incomingURL slack incoming webhook string
 * @constructor
 */
function Slack(incomingURL) {
  if (incomingURL !== void 0) {
    this.incomingURL = incomingURL;
  }
}

Slack.prototype.sendTweet = function(tweet) {
  if (tweet === void 0) {
    return false;
  }
  
  var options = {
    uri: incomingURL,
    headers: [
      {
        name: 'content-type',
        value: 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    ],
    form: JSON.stringify(
      {channel: '#shift-bot',
        username: 'Twitter',
        attachments: [
          {
            color: '#36a64f',
            author_name: tweet.author,
            // author_link: http://flickr.com/bobby/,
            // author_icon: http://flickr.com/icons/bobby.jpg,
            text: tweet.body ,
            thumb_url: tweet.avatar
          }
        ]
      })
  };
  request.post(options, function(err, resp, body) {
    console.log(resp);
  });
  return true;
};

module.exports = Slack;
