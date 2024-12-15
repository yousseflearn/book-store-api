const express = require('express');
const router = express.Router();
const Joi = require('joi');

const authors = [
  {
    id: 1,
    firstName: 'youssef',
    lastName: 'amin',
    nationality: 'usa',
    image: 'defaultImg.png',
  },
  {
    id: 2,
    firstName: 'khalid',
    lastName: 'ali',
    nationality: 'usa',
    image: 'defaultImg.png',
  },
];

/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access Public
 */
router.get('/', (req, res) => {
  res.status(200).json(authors);
});

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access Public
 */
router.get('/:id', (req, res) => {
  const author = authors.find((aut) => aut.id === parseInt(req.params.id));

  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: 'Author not found' });
  }
});

/**
 * @desc Create new author
 * @route /api/authors/
 * @method POST
 * @access Public
 */
router.post('/', (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const author = {
    id: authors.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
  };
  authors.push(author);
  console.log(authors);
  res.status(201).json({ message: 'Author is added successfully' });
});

/**
 * @desc Update the existing author
 * @route /api/authors/
 * @method PUT
 * @access Public
 */
router.put('/:id', (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const author = authors.find((aut) => aut.id === parseInt(req.params.id));
  if (author) {
    res
      .status(200)
      .json({ message: 'Author information has been updated successfully!' });
  } else {
    res.status(404).json({ message: 'Author is not found!' });
  }
});

/**
 * @desc Delete the existing author
 * @route /api/authors/:id
 * @method DELETE
 * @access Public
 */
router.delete('/:id', (req, res) => {
  const author = authors.find((aut) => aut.id === parseInt(req.params.id));
  if (author) {
    res
      .status(200)
      .json({ message: 'Author information has been deleted successfully!' });
  } else {
    res.status(404).json({ message: 'Author is not found!' });
  }
});

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

module.exports = router;
