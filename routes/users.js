var express = require("express");
var router = express.Router();
var { authenticate } = require("./../middlewares/authenticate");
const { getUser, addUser } = require("../controllers/user.controller");

/* GET users listing. */
router.get("/", authenticate, getUser);
router.post("/", addUser);

module.exports = router;
