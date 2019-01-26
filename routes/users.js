var express = require("express");
var router = express.Router();

const User = require("../models/user.model");

/* GET users listing. */
router.get("/", function(req, res, next) {
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
});

module.exports = router;
