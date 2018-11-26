// ! dependencies ===================
const mongoose = require('mongoose');
const express = require('express');
const bp = require('body-parser');
// ! dependencies ===================

// ! dev dependencies ===================
const morgan = require('morgan');
// ! dev dependencies ===================

// ! env ===================
const dotenv = require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
// ! env ===================

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

// ! custom routes =======================
const mainRoute = require('./api/routes/main.routes.js');
const graphqlHTTP = require('./api/routes/graphql.routes.js');
// ! custom routes =======================

// ! rest API route ====================
app.use('/api', mainRoute);
// ! rest API route ====================

// ! graphql route testing ====================
app.use('/graphql', mainRoute);
// ! graphql route testing ====================

// // ! local mongo connection ====================
// mongoose.connect(
//   'mongodb://localhost/bbs_db',
//   {useNewUrlParser: true},
//   function(err) {
//     if (err) console.error(err);
//     console.log('--< Connection successful');
//   }
// );
// // ! local mongo connection ====================

// ! remote mongo connection ====================
mongoose
 .connect(
  mongoURI,
  {useNewUrlParser: true}
 )
 .then(() => console.log('Connected to mLab MongoDB successfully'))
 .catch((err) => console.log(err));
// ! remote mongo connection ====================

app.listen(_PORT, () => {
 console.log(`SERVER USING PORT: ${_PORT}`);
});
