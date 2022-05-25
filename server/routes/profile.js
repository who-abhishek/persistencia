var express = require('express');
var router = express.Router();

/**
 * @route  GET api/profile
 * @desc   Profile route test
 * @access Public
 */
router.get('/', (req, res, next) => {
  res.send('profile route');
});

module.exports = router;
