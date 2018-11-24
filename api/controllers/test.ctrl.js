const model = require('../models/main.model');

module.exports = {
 helloWorld: (req, res) => {
  res.json({hello: 'world'});
 },

 testAdd: (req, res) => {
  const user_name = req.body.name;
  model.test
   .create({user_name})
   .then((result) => {
    res.json(result);
   })
   .catch((err) => {
    console.error(err);
   });
 },
};
