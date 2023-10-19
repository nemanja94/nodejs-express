const pool = require("../lib/db");

/**
 * Creates a new task.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The response object with the status and data.
 */
exports.createTask = (req, res) => {
  const { title, description, userId, statusId } = req.body;

  if ((!title, !description, !userId, !statusId)) {
    return res
      .status(400)
      .json({ message: "Please provide valid data for the new Task" });
  }

  pool.getConnection((error, connection) => {
    if (error) {
      return res.status(500).json({
        message: "Error while getting new connection from pool",
        error,
      });
    }

    const query =
      "INSERT INTO `trello_task` (`title`, `description`, `assigned_user_id`, `status_id`) VALUES (?, ?, ?, ?)";

    connection.query(
      query,
      [title, description, userId, statusId],
      (error, result) => {
        connection.release();

        if (error) {
          return res.status(500).json({
            message: "Something went wrong with our app or servers",
            error,
          });
        }

        const lastInsertedId = result.insertId;

        return res.status(201).json({
          message: `Task ${title} is successfully created.`,
          task_id: lastInsertedId,
        });
      }
    );
  });
};

/**
 * Retrieves all tasks from the database.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Object} the JSON response containing all tasks
 */
exports.getAllTasks = (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error,
      });
      return;
    }

    connection.query("SELECT * FROM `trello_task`", (error, result) => {
      connection.release();
      if (error) {
        res.status(500).json({
          message: `Something went wrong with our app or servers`,
          error: error,
        });
        return;
      }

      return res.status(200).json(result);
    });
  });
};

/**
 * Retrieves a single task from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The retrieved task.
 */
exports.getOneTask = (req, res) => {
  const taskId = req.params.id;

  if (!taskId) {
    return res
      .status(400)
      .json({ message: "Please provide a valid Task data" });
  }

  pool.getConnection((error, connection) => {
    if (error) {
      return res.status(500).json({
        message: "Error while getting a new connection from the pool",
        error: error,
      });
    }

    const query = "SELECT * FROM `trello_task` WHERE `id` = ?";
    connection.query(query, [req.params.id], (error, result) => {
      connection.release();

      if (error) {
        return res.status(500).json({
          message: "Something went wrong with our app or servers",
          error: error,
        });
      }

      return res.status(200).json(result);
    });
  });
};

/**
 * Updates a task in the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated task or an error message.
 */
exports.updateTask = (req, res) => {
  const { id, title, description } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Please provide a valid info about Task" });
  }

  pool.getConnection((error, connection) => {
    if (error) {
      return res.status(500).json({
        message: "Error while getting new connection from pool",
        error,
      });
    }

    const query =
      "UPDATE `trello_task` SET `title` = ?, `description` = ? WHERE `id` = ?";
    const values = [title, description, id];

    connection.query(query, values, (error, result) => {
      connection.release();

      if (error) {
        return res.status(500).json({
          message: "Something went wrong with our app or servers",
          error,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Category is not found." });
      }

      return res.status(201).json({
        message: `Category with id=${id} is successfully updated to ${title}.`,
      });
    });
  });
};

/**
 * Assigns a task to a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.body.taskId - The ID of the task to be assigned.
 * @param {string} req.body.userId - The ID of the user to whom the task will be assigned.
 * @return {Object} The updated response object.
 */
exports.assignTask = (req, res) => {
  const { taskId, userId } = req.body;

  if (!taskId || !userId) {
    return res
      .status(400)
      .json({ message: "Please provide a valid Task data" });
  }

  pool.getConnection((error, connection) => {
    if (error) {
      return res.status(500).json({
        message: "Error while getting new connection from pool",
        error,
      });
    }

    const query =
      "UPDATE `trello_task` SET `assigned_user_id` = ? WHERE `id` = ?";
    const values = [userId, taskId];

    connection.query(query, values, (error, result) => {
      connection.release();

      if (error) {
        return res.status(500).json({
          message: "Something went wrong with our app or servers",
          error,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Task is not found." });
      }

      return res.status(201).json({
        message: `Task with id=${taskId} is successfully assigned to user with id=${userId}.`,
      });
    });
  });
};

exports.updateStatus = (req, res) => {
  const { taskId, statusId } = req.body;

  if (!taskId || !statusId) {
    return res
      .status(400)
      .json({ message: "Please provide a valid Task data" });
  }

  pool.getConnection((error, connection) => {
    if (error) {
      return res.status(500).json({
        message: "Error while getting new connection from pool",
        error,
      });
    }

    const query = "UPDATE `trello_task` SET `status_id` = ? WHERE `id` = ?";
    const values = [statusId, taskId];

    connection.query(query, values, (error, result) => {
      connection.release();

      if (error) {
        return res.status(500).json({
          message: "Something went wrong with our app or servers",
          error,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Task is not found." });
      }

      return res.status(201).json({
        message: `Task with id=${taskId} is successfully changed status to status with id=${statusId}.`,
      });
    });
  });
};

/**
 * Deletes a task by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The JSON response indicating the success or failure of the deletion.
 */
exports.deleteTask = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Please provide a valid Task data" });
  }

  pool.getConnection((error, connection) => {
    if (error) {
      return res.status(500).json({
        message: "Error while getting new connection from pool",
        error,
      });
    }

    const query = "DELETE FROM `trello_task` WHERE `trello_task`.`id` = ?";
    connection.query(query, [id], (error, result) => {
      connection.release();

      if (error) {
        return res.status(500).json({
          message: "Something went wrong with our app or servers",
          error,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Task is not found." });
      }

      return res
        .status(200)
        .json({ message: `Task with id: ${id} is successfully deleted.` });
    });
  });
};
