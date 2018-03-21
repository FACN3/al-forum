const pool = require("./db_connection");

const delteLike = (post_id,user_id, cb) => {
  pool.query("delete from likes where post_id=$1 and user_id=$2", [post_id,user_id], (err, res) => {
    if (err) {cb(false)}else{
      cb(true);
    }
  })
}

module.exports = delteLike;
