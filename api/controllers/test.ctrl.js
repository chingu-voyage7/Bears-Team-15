const model = require('../models/main.model');

module.exports = {
 helloWorld: (req, res) => {
  model.test
   .find({})
   .then((result) => {
    res.json(result);
   })
   .catch((err) => {
    res.json(err);
   });
 },

 testAdd: (req, res) => {
  const userName = req.body.name;
  model.test
   .create({userName})
   .then((result) => {
    res.json(result);
   })
   .catch((err) => {
    console.error(err);
   });
 },
};
