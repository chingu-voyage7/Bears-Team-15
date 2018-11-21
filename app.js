const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const passport = require("passport");
require("./config/passport")(passport);

// Instantiate app
const app = express();
const db = require("./config/keys").mongoURI;

// Connect to remote mongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Home
app.use(passport.initialize());
// app.get("/", (req, res) => res.send("Hello World"));

// Users route
app.use("/api/users", users);

// Listen on provided port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));