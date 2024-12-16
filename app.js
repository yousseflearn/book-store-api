const express = require('express');
const booksPath = require('./routes/books.js');
const authorsPath = require('./routes/authors');
const mongoose = require('mongoose');

// Connection To Database
mongoose
  .connect('mongodb://localhost/bookStoreDB')
  .then(() => console.log('Connected To MongoDB...'))
  .catch((error) => console.log('Connection Failed To Mongodb', error));

// init app
const app = express();

// use middleware because req use json and express use javascript
/* The express.json() function is a built-in middleware in Express that is used for parsing incoming requests with JSON payload. The express.json middleware is important for parsing incoming JSON payloads and making that data available in the req.body or further processing within the routes. Without using express.json, Express will not automatically parse the JSON data in the request body.
By using the express.json middleware, you can handle POST, PUT, or PATCH requests that send JSON data from the client to the server.*/
app.use(express.json());

//routes
app.use('/api/books', booksPath);
app.use('/api/authors', authorsPath);

// Running The Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
