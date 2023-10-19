const pool = require("../lib/db");

exports.getAllUsers = (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error,
      });
      return;
    }

    connection.query("SELECT * FROM `trello_user`", (error, result) => {
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
