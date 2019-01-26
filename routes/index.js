var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({
    success: true,
    name: "API",
    message: "You have reached the MeanWhile API server"
  });
});

module.exports = router;
