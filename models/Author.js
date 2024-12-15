const { timeStamp } = require('console');
const mongoose = require('mongoose');

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

const Author = mongoose.model('Author', AuthorSchema);
module.exports = { Author };
