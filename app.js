const express = require('express');

// init app
const app = express();

const books = [
  {
    id: 1,
    title: 'How to Get What You Want',
    author: 'John Gray',
    price: 10,
    cover: 'soft cover',
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
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

// Running The Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
