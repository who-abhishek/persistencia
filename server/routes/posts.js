var express = require('express');
var router = express.Router();

/**
 * @route  GET api/posts
 * @desc   Route test
 * @access Public
 */
 router.get('/', (req, res, next) => {
  res.send('posts route');
});

module.exports = router;
