const express = require("express");
const router = express.Router();

const userControler = require("../Controllers/UserController");

router.get("/", userControler.getAllUsers);

module.exports = router;
