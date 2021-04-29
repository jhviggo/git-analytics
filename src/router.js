const express = require('express');
const router = express.Router();

const { getGitLogStats, getCommit, getHotspots } = require('./controllers/index');

// route: /api/**
router.use('/api/log', async (_, res) => {
  res.send(await getGitLogStats())
});

router.use('/api/commit/:hash', async (req, res) => {
  res.send(await getCommit(req.params.hash));
});

router.use('/api/hotspot', async (_, res) => {
  res.send(await getHotspots());
});

// route: /
router.use(/\/$/, async (_, res) => {
  res.render('index', { title: 'Git analytics', log: await getGitLogStats() })
});

module.exports = router;
