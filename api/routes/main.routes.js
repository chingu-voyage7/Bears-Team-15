const express = require('express');
const router = express.Router();

const test = require('./test.routes.js');
router.use('/test', test);

module.exports = router;
