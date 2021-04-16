const express = require('express');
const router = express.Router();

/* route: / */
router.use('/', (_, res) => {
  res.render('index', { title: 'Git analytics', message: 'Hello Pug!' })
});

module.exports = router;
