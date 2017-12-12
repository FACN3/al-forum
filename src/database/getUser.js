const pool = require('./db_connection');


const getUser = (username, cb) => {
  pool.query("SELECT * FROM users WHERE username=$1",[username], (err, res) => {
    if (err) {
      cb(err);
    } else {
      if (res.rows.length == 1) {
        cb(res.rows);
      } else {
        cb('User does not exist :(')
      }
    }
  });
}

module.exports = getUser;
