const express = require('express');
const logger = require('./middlewares/logger.js');
const { notFound, errorHandler } = require('./middlewares/error.js');
const connectToDB = require('./config/db.js');
require('dotenv').config();

// Connection To Database
connectToDB();
// init app
const app = express();

// use middleware because req use json and express use javascript
/* The express.json() function is a built-in middleware in Express that is used for parsing incoming requests with JSON payload. The express.json middleware is important for parsing incoming JSON payloads and making that data available in the req.body or further processing within the routes. Without using express.json, Express will not automatically parse the JSON data in the request body.
By using the express.json middleware, you can handle POST, PUT, or PATCH requests that send JSON data from the client to the server.*/
app.use(express.json());
app.use(logger);

//routes
app.use('/api/books', require('./routes/books'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users.js'));

// Error handling Middleware
app.use(notFound);
app.use(errorHandler);

// Running The Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
