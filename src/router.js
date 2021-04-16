const express = require('express');
const router = express.Router();

const { executeCommand } = require('./controllers/index');

// route: /git/**
router.use('/git/log', async (_, res) => {
  res.send(await executeCommand())
});

// route: /
router.use('/', async (_, res) => {
  res.render('index', { title: 'Git analytics', message: await executeCommand() })
});

module.exports = router;
