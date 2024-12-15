const express = require('express');
const router = express.Router();
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require('../models/Author.js');

/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const authorList = await Author.find();
    res.status(200).json(authorList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access Public
 */
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: 'Author not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

/**
 * @desc Create new author
 * @route /api/authors/
 * @method POST
 * @access Public
 */
router.post('/', async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });

    const result = await author.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong ' });
  }
});

/**
 * @desc Update the existing author
 * @route /api/authors/
 * @method PUT
 * @access Public
 */
router.put('/:id', async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

/**
 * @desc Delete the existing author
 * @route /api/authors/:id
 * @method DELETE
 * @access Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: 'Author information has been deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Author is not found!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
