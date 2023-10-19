const express = require("express");
const bodyParser = require("body-parser");

const taskRoutes = require("./Routes/TaskRoutes");
const userRoutes = require("./Routes/UserRoutes");
const taskStatusRoutes = require("./Routes/TaskStatusRoutes");

const app = express(); // Inicijalizacija app

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/task", taskRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task-status", taskStatusRoutes);
module.exports = app;
