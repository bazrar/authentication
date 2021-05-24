const express = require('express');
const app = express();

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const verify = require('./routes/verifyToken');

// body parser
app.use(express.json());

// Route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', verify, postRoute);

module.exports = app;
