const pool = require("./db_connection");

const getPosts = () => {
  pool.query("select * from posts;", (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.rows);
      console.log("success");
    }
  });
};

module.exports = getPosts;
