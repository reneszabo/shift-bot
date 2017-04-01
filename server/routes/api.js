module.exports = function(io) {
  const express = require('express');
  const router = express.Router();
  /* GET api listing. */
  router.get('/', function(req, res) {
    res.json('api works');
  });

  router.route('/slack')
    .get(function(req, res) {
      res.json({message: 'hey'});
    })
    .post(function(req, res) {
      res.json({message: 'hey post'});
    })
  ;
  return router;
};
