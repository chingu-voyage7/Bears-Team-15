// ! dependencies ===================
const mongoose = require('mongoose');
const express = require('express');
const bp = require('body-parser');
const passport = require('passport');
const path = require('path');
// ! dependencies ===================

// ! dev dependencies ===================
const morgan = require('morgan');
// ! dev dependencies ===================

// ! env ===================
require('dotenv').config();
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

// ! remote mongo connection ====================
mongoose
    .connect(
        mongoURI,
        {useNewUrlParser: true}
    )
    .then(() => console.log('Connected to mLab MongoDB successfully'))
    .catch((err) => console.log(err));
// ! remote mongo connection ====================

// ! custom routes =======================
const mainRoute = require('./api/routes/main.routes.js');
// ! custom routes =======================
// Passport
app.use(passport.initialize());
require('./config/passport')(passport);
app.use(express.static('client/build'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', mainRoute);

// ! graphql route testing ====================
const queryGraph = require('./api/graphql_route/graphROOT.js');
app.use('/graph', queryGraph);
// ! graphql route testing ====================

app.listen(_PORT, () => {
    console.log(`SERVER USING PORT: ${_PORT}`);
});
