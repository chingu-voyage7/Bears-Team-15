const express = require('express');
const router = express.Router();

const test = require('./test.routes.js');
router.use('/test', test);

const g = require('./graphql.routes');
router.use('/gg', g);

module.exports = router;
