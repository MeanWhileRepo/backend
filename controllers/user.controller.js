const User = require("../models/user.model");
var uuid = require("uuid/v4");
var tokenizer = require("./../utils/tokenizer");

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

//login
exports.login = (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return next("Missing required parameters");

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return next(err);
    // No user found with that email
    if (!user) return next("No user found");
    // Make sure the password is correct
    if (!user.verifyPassword(req.body.password))
      return next("Incorrect password");

    var tokenData = {
      uuid: user.uuid,
      email: user.email,
      fullName: user.fullName,
      status: user.status
    };

    var token = tokenizer.generateToken(tokenData);
    res.json({ message: "Login successful", data: { token } });
  });
};
