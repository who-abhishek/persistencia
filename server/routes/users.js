var express = require("express");
var router = express.Router();
const gravatar = require("gravatar");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");
const config = require('config');
const User = require("../models/User");
const bcrypt = require("bcryptjs");

/**
 * @route  GET api/user
 * @desc   Register user
 * @access Public
 */
router.post(
  "/",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Please enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body(
      "password",
      "Please enter a password with more than 6 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res, next) => {
    console.log("user route line 10", req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
       return res.status(400).json({ errors: [{ msg: "User already exist" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        id:user.id
      }


      jwt.sign(payload, config.get('jwtToken'),{ expiresIn:3600 }, (err,token) =>{
        if(err) throw err;
        res.json({ token });
      }) ;

    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
