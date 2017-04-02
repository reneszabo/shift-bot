module.exports = function(io) {
  const express = require('express');
  const router = express.Router();
  /* GET api listing. */
  router.get('/', function(req, res) {
    res.json('api works');
  });

  return router;
};
