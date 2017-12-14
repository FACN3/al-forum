const pool = require("./db_connection");

const isAdmin = (username, cb) => {
  pool.query(
    "SELECT admin FROM users WHERE username=$1",
    [username],
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows[0].admin);
      }
    }
  );
};

module.exports = isAdmin;
