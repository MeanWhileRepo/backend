const User = require("../models/user.model");

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
  //   res.json({
  //     uuid: "124345",
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     email: req.body.email,
  //     password: req.body.password,
  //     create_ts: Date.now(),
  //     status: "inactive".toLocaleUpperCase()
  //   });

  let userObj = {
    uuid: "124345",
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    create_ts: Date.now(),
    status: "inactive".toLocaleUpperCase()
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
