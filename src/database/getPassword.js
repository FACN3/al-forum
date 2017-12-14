const pool = require("./db_connection");

const getPassword = (username, cb) => {
  pool.query(
    "SELECT password from users WHERE username=$1",
    [username],
    (err, res) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, res.rows[0].password);
      }
    }
  );
};

module.exports = getPassword;
