var express = require("express");
var router = express.Router();
const { getUser, addUser } = require("../controllers/user.controller");

/* GET users listing. */
router.get("/", getUser);
router.post("/", addUser);

module.exports = router;
