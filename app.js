const { error } = require('console');
const express = require('express');

// init app
const app = express();

// use middleware because req use json and express use javascript
/* The express.json() function is a built-in middleware in Express that is used for parsing incoming requests with JSON payload. The express.json middleware is important for parsing incoming JSON payloads and making that data available in the req.body or further processing within the routes. Without using express.json, Express will not automatically parse the JSON data in the request body.
By using the express.json middleware, you can handle POST, PUT, or PATCH requests that send JSON data from the client to the server.*/
app.use(express.json());

// joi is used for validation of inputs of users
// The most powerful schema description language and data validator for JavaScript.
const Joi = require('joi');

const books = [
  {
    id: 1,
    title: 'How to Get What You Want',
    author: 'John Gray',
    description: 'Self Improving book',
    price: 10,
    cover: 'soft cover',
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'Self Improving book',
    price: 20,
    cover: 'soft cover',
  },
];

// Http Method
app.get('/', (req, res) => {
  res.send('hi,Welcome To Express');
});

// to get all books
app.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

// to get only one book
app.get('/api/books/:id', (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id)); // every thing we bring from req are strings ,to convert we use parseInt()
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'book not found' });
  }
});

// creation new book
app.post('/api/books', (req, res) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(3).max(500).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  };

  books.push(book);
  console.log(books);
  res.status(201).json(book); // 201=>created successfully
});

// Running The Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
