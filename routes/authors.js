const express = require('express');
const router = express.Router();
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require('../models/Author.js');
const asyncHandler = require('express-async-handler');

/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access Public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const authorList = await Author.find();
    res.status(200).json(authorList);
  })
);

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access Public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);

    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: 'Author not found' });
    }
  })
);

/**
 * @desc Create new author
 * @route /api/authors/
 * @method POST
 * @access Public
 */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { error } = validateCreateAuthor(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });

    const result = await author.save();
    res.status(201).json(result);
  })
);

/**
 * @desc Update the existing author
 * @route /api/authors/
 * @method PUT
 * @access Public
 */
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateAuthor(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          image: req.body.image,
        },
      },
      { new: true }
    );
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: 'Author not found' });
    }
  })
);

/**
 * @desc Delete the existing author
 * @route /api/authors/:id
 * @method DELETE
 * @access Public
 */
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: 'Author information has been deleted successfully!',
      });
    } else {
      res.status(404).json({ message: 'Author is not found!' });
    }
  })
);

module.exports = router;
