const express = require('express');
const router = express.Router();

const tstCtrl = require('../controllers/test.ctrl');

router
 .route('/')
 .get(tstCtrl.helloWorld)
 .post(tstCtrl.testAdd);

module.exports = router;
