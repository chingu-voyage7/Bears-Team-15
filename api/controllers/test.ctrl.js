const model = require("../models/main.model");

module.exports = {
  helloWorld: (req, res) => {
    res.json({ hello: "world" });
  },

  testAdd: (req, res) => {
    const userName = req.body.name;
    model.test
      .create({ userName })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
