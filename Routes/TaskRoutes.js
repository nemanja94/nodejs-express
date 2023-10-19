const express = require("express");
const router = express.Router();

const taskControler = require("../Controllers/TaskController");

router.get("/", taskControler.getAllTasks);
router.get("/:id", taskControler.getOneTask);
router.post("/", taskControler.createTask);
router.put("/", taskControler.updateTask);
router.put("/assign", taskControler.assignTask);
router.put("/update-status", taskControler.updateStatus);
router.delete("/:id", taskControler.deleteTask);

module.exports = router;
