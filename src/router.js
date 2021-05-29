const express = require('express');
const router = express.Router();

const { getGitLogStats, getCommit, getHotspots, getKnowledgeMap } = require('./controllers/index');

// route: /api/**
router.use('/api/log', async (_, res) => {
  res.send(await getGitLogStats());
});

router.use('/api/commit/:hash', async (req, res) => {
  res.send(await getCommit(req.params.hash));
});

router.use('/api/hotspots', async (_, res) => {
  res.send(await getHotspots());
});

router.use('/api/knowledge-map', async (_, res) => {
  res.send(await getKnowledgeMap());
});

// route: /
router.use(/\/$/, async (req, res) => {
  const log = await getGitLogStats();
  const perPage = 30;
  const maxPage = parseInt(log.commits.length / perPage) + 1;
  const page = parseInt(req.query.page)
    ? parseInt(req.query.page) - 1
    : 0;
  const from = page * perPage >= log.commits.length
    ? (maxPage - 1) * perPage
    : page * perPage
  
  const to = from + perPage;

  res.render('index', {
    title: 'Git analytics',
    log,
    from,
    to,
    maxPage,
    page: page,
  });
});

// route: hotspots
router.use('/hotspots', async (_, res) => {
  res.render('hotspots');
});

// route: knowledge-map
router.use('/knowledge-map', async (_, res) => {
  res.render('knowledge-map', {
    outerTitle: 'Outer ring',
    outerDesc: 'The outer ring describes the total line count over all commits.',
    innerTitle: 'Inner ring',
    innerDesc: 'The inner ring describes the total file changes.'
  });
});

module.exports = router;
