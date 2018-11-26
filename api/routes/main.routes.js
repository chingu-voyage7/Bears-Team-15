const express = require('express');
const router = express.Router();

const test = require('./test.routes.js');
const users = require('./users.routes.js');

router.use('/test', test);
router.use('/users', users);

module.exports = router;
