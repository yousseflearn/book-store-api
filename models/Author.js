const mongoose = require('mongoose');
const Joi = require('joi');

const AuthorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    image: {
      type: String,
      default: 'defaultImage.png',
    },
  },
  { timestamps: true }
);

// validation during creation of new author
function validateCreateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200).required(),
    lastName: Joi.string().trim().min(3).max(200).required(),
    nationality: Joi.string().trim().min(3).max(500).required(),
    image: Joi.string(),
  });

  return schema.validate(obj);
}

// validation during updating of new author
function validateUpdateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200),
    lastName: Joi.string().trim().min(3).max(200),
    nationality: Joi.string().trim().min(3).max(500),
    image: Joi.string().trim(),
  });

  return schema.validate(obj);
}

const Author = mongoose.model('Author', AuthorSchema);
module.exports = { Author, validateCreateAuthor, validateUpdateAuthor };
