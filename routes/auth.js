const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 */

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: 'This user already registered!' });
    }

    // crypt password
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      email: req.body.email,
      userName: req.body.userName,
      password: hashedPassword,
      isAdmin: req.body.isAdmin,
    });

    const result = await user.save();
    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
    );

    // separate password  from data
    const { password, ...other } = result._doc;

    // sending data without password to user for security
    res.status(201).json({ ...other, token });
  })
);

/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid Email or Wrong Password!' });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: 'Invalid Email or Wrong Password!' });
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
    );

    // separate password  from data
    const { password, ...other } = user._doc;

    // sending data without password to user for security
    res.status(200).json({ ...other, token });
  })
);

module.exports = router;
