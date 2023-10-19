const express = require("express");
const router = express.Router();

const taskStatusControler = require("../Controllers/TaskStatusController");

router.get("/", taskStatusControler.getAllTasksStatuses);

module.exports = router;
