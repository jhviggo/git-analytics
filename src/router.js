const express = require('express');
const router = express.Router();

const { getGitLogStats, getCommit } = require('./controllers/index');

// route: /git/**
router.use('/git/log', async (_, res) => {
  res.send(await getGitLogStats())
});

router.use('/git/commit/:hash', async (req, res) => {
  res.send(await getCommit(req.params.hash));
});

// route: /
router.use('/', async (_, res) => {
  res.render('index', { title: 'Git analytics', log: await getGitLogStats() })
});

module.exports = router;
