const pool = require("./db_connection");

const getPosts = cb => {
  pool.query("SELECT * FROM posts ORDER BY TimeStamp DeSC;", (err, res) => {
    if (err) {
      cb(err);
      console.log(err);
    } else {
      cb(null, res);
    }
  });
};

module.exports = getPosts;
