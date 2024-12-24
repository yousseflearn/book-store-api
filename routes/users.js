const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { validateUpdateUser, User } = require('../models/User');
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require('../middlewares/verifyToken');

/**
 * @desc Update User
 * @route /api/users/:id
 * @method PUT
 * @access private
 */
router.put(
  '/:id',
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          userName: req.body.userName,
        },
      },
      { new: true }
    ).select('-password');

    res.status(200).json(updateUser);
  })
);

/**
 * @desc Get All Users
 * @route /api/users/
 * @method GET
 * @access private (only Admins)
 */
router.get(
  '/',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');

    res.status(200).json(users);
  })
);

module.exports = router;
