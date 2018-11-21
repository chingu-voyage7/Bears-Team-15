// ! dependencies ===================
const mongoose = require('mongoose');
const express = require('express');
const bp = require('body-parser');
// ! dependencies ===================

// ! dev dependencies ===================
const morgan = require('morgan');
// ! dev dependencies ===================

// ! PORT CONNECTION ======================
const _PORT = process.env.PORT || 8000;
// ! PORT CONNECTION ======================

// ! middleware =========================
// * express always on top of the middlewares
const app = express();
// * morgan
app.use(morgan('dev'));
// * parse application/x-www-form-urlencoded
app.use(bp.urlencoded({extended: false}));
// * parse application/json
app.use(bp.json());
// ! middleware =========================

//! custom routes =======================
const mainRoute = require('./api/routes/main.routes.js');
//! custom routes =======================

app.use('/api', mainRoute);

// ! mongo connection ====================
mongoose.connect(
  'mongodb://localhost/bbs_db',
  {useNewUrlParser: true},
  function(err) {
    if (err) console.error(err);
    console.log('--< Connection successful');
  }
);

// ! mongo connection ====================

app.listen(_PORT, () => {
  console.log(`SERVER USING PORT: ${_PORT}`);
});
