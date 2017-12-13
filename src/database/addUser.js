const pool = require("./db_connection");

const addUser = (username, password, name, cb) => {
  pool.query(
    "INSERT INTO USERS(username, password, name) VALUES ($1, $2, $3);",
    [username, password, name],
    (err, res) => {
      if (err) {
        console.log(err);
        cb(false);
      } else {
        cb(true);
      }
    }
  );
};

module.exports = addUser;
