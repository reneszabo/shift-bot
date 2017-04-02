module.exports = function(io) {
  const express = require('express');
  const router = express.Router();
  const globalVariables = require('./../global-variables');

  // ENDPOINTS ROUTES
  router.get('/', function(req, res) {
    console.log('api slack works');
    res.json('api slack works');
  });
  router.route('/listen')
    .get(function(req, res) {
      console.log(req);
      res.json({status: globalVariables.slackActive});
    })
    .post(function(req, res) {
      console.log(req);
      globalVariables.slackActive = !globalVariables.slackActive;
      res.json({status: globalVariables.slackActive});
    });

  return router;
};
