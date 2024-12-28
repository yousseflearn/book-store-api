const connectToDB = require('./config/db');
const { Book } = require('./models/Book');
const { Author } = require('./models/Author');
const { books, authors } = require('./data');
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

// import authors
const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log('Authors inserted');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// remove books
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log('Books removed');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// remove authors
const removeAuthors = async () => {
  try {
    await Author.deleteMany();
    console.log('Authors removed');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-import') {
  importBooks();
} else if (process.argv[2] === '-remove') {
  removeBooks();
} else if (process.argv[2] === '-import-authors') {
  importAuthors();
} else if (process.argv[2] === '-remove-authors') {
  removeAuthors();
}
