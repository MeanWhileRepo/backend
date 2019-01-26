const User = require("../models/user.model");
var uuid = require("uuid/v4");

//get all users
exports.getUser = (req, res, next) => {
  User.find()
    .then(users => {
      res.json({
        error: false,
        data: users
      });
    })
    .catch(error => {
      res.json({
        error: true,
        message: error.message
      });
    });
};

//add new user
exports.addUser = (req, res, next) => {
  let userObj = {
    uuid: uuid(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    create_ts: Date.now()
  };
  var user = new User(userObj);
  user.save(function(err) {
    if (err) return next(err);
    var data = JSON.parse(JSON.stringify(user));
    res
      .status(200)
      .json({ error: false, message: "New user added", data: data });
  });
};
