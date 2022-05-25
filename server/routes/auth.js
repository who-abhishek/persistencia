var express = require('express');
var router = express.Router();

/**
 * @route  GET api/profile
 * @desc   Route test
 * @access Public
 */
 router.get('/', (req, res, next) => {
  res.send('auth route');
});

module.exports = router;
