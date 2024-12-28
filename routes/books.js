const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require('../models/Book');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');

/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    // comparison operators query
    //$gt : greater than
    //$gte : greater or equal than
    //$lt : less than
    //$lte : less or equal than
    //$in : greater than
    //$nin : greater than
    //$eq : equal
    //$ne : not equal

    const { minPrice, maxPrice } = req.query;
    let books;
    if (minPrice && maxPrice) {
      books = await Book.find({
        price: { $gte: minPrice, $lte: maxPrice },
      }).populate('author', ['_id', 'firstName', 'lastName']);
      if (books) {
      }
    } else {
      books = await Book.find().populate('author', [
        '_id',
        'firstName',
        'lastName',
      ]);
    }

    res.status(200).json(books);
  })
);

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate('author');
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'book not found' });
    }
  })
);

/**
 * @desc Create new book
 * @route /api/books
 * @method POST
 * @access private (only for admins)
 */
router.post(
  '/',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });
    const result = await book.save();
    res.status(201).json(result);
  })
);

/**
 *
 * @desc Update book by id
 * @route /api/books/:id
 * @method PUT
 * @access private (only for admins)
 */
router.put(
  '/:id',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.cover,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedBook);
  })
);

/**
 *
 * @desc Delete book by id
 * @route /api/books/:id
 * @method DELETE
 * @access private (only for admins)
 */
router.delete(
  '/:id',
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Book has been deleted Successfully' });
    } else {
      res.status(404).json({ message: 'Book not found!' });
    }
  })
);

module.exports = router;
