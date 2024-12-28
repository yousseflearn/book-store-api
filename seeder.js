const connectToDB = require('./config/db');
const { Book } = require('./models/Book');
const { books } = require('./data');
require('dotenv').config();

// connect to database
connectToDB();

// import books
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log('Books inserted');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// import books
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log('Books removed');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-import') {
  importBooks();
} else if (process.argv[2] === '-remove') {
  removeBooks();
}
