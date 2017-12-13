const pool = require("./db_connection");

const getPosts = cb => {
  pool.query("select * from posts;", (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

module.exports = getPosts;
