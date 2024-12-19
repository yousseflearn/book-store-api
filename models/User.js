const mongoose = require('mongoose');
const Joi = require('joi');
const { timeStamp } = require('console');

// User Schema
const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 200,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Validate Register User
function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    userName: Joi.string().trim().min(2).max(200).required(),
    password: Joi.string().trim().min(6).required(),
    isAdmin: Joi.bool(),
  });
  return schema.validate(obj);
}

// Validate Login User
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(obj);
}

// Validate Register User
function validateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).email(),
    userName: Joi.string().trim().min(2).max(200),
    password: Joi.string().trim().min(6),
    isAdmin: Joi.bool(),
  });
  return schema.validate(obj);
}

// User Model
const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};
