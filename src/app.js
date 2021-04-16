// packages
const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// custom
const { PORT, LOGGING_LEVEL } = require('./config/env');
const router = require('./router');

const app = express();
app.use(morgan(LOGGING_LEVEL));
app.use(express.json());
app.set('view engine', 'pug')
app.set('views', './src/views');

// routes
app.use(router);

// listen
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});

// close server
process.on('SIGINT', () => {
  console.log('Shutting down...');
});
