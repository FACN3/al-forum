const pool = require("./db_connection");

const addPost = (title, content, user_id, cb) => {
  pool.query(
    "INSERT INTO POSTS(title, content, user_id) VALUES ($1, $2, $3);",
    [title, content, user_id],
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

module.exports = addPost;
