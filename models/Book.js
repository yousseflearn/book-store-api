const mongoose = require('mongoose');
const { Author } = require('../models/Author');
// joi is used for validation of inputs of users
// The most powerful schema description language and data validator for JavaScript.
const Joi = require('joi');

// Book Schema
const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 250,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Author,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
    },
    price: {
      type: Number,
      required: true,
      minLength: 0,
    },
    cover: {
      type: String,
      required: true,
      enum: ['soft cover', 'hard cover'],
    },
  },
  { timestamps: true }
);

// validation during creation of new book
function validateCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250).required(),
    author: Joi.string().required(),
    description: Joi.string().trim().min(5).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().valid('soft cover', 'hard cover').required(),
  });

  return schema.validate(obj);
}

// validation during update of existing book
function validateUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250),
    author: Joi.string(),
    description: Joi.string().trim().min(5),
    price: Joi.number().min(0),
    cover: Joi.string().valid('soft cover', 'hard cover'),
  });

  return schema.validate(obj);
}

// Book model
const Book = mongoose.model('Book', BookSchema);
module.exports = { Book, validateCreateBook, validateUpdateBook };
