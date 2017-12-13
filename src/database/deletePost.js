const pool = require("./db_connection");

const deletePost = (postId, cb) => {
  pool.query("delete from posts where id=$1", [postId], (err, res) => {
    if (err) {
      cb(err);
      console.log(err);
    } else {
      cb(null, "Success");
    }
  });
};

module.exports = deletePost;
