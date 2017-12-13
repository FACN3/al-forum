const pool = require("./db_connection");

const checkUser = (username, cb) => {
  pool.query(
    "SELECT username FROM users WHERE username=$1",
    [username],
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        if (res.rows.length == 0) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      }
    }
  );
};

module.exports = checkUser;
