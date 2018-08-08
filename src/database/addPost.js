const pool = require("./db_connection");

const addPost = (title, content, privacy,user_id, cb) => {
  pool.query(
    "INSERT INTO POSTS(title, content, private,user_id) VALUES ($1, $2, $3,$4);",
    [title, content, privacy,user_id],
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
