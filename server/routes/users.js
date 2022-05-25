var express = require("express");
var router = express.Router();
const {  body, validationResult } = require("express-validator");

/**
 * @route  GET api/user
 * @desc   Register user
 * @access Public
 */
router.post(
  "/",
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password','Please enter a password with more than 6 characters').isLength({ min: 5 }),
  ],
  (req, res, next) => {
    console.log("user route line 10", req.body);
     // Finds the validation errors in this request and wraps them in an object with handy functions
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

    res.send("users route");
  }
);

module.exports = router;
