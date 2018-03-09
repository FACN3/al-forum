const pool = require("./db_connection");

const delteLike = (like_id, cb) => {
  pool.query("delete from likes where id=$1", [like_id], (err, res) => {
    if (err) {cb(false)}else{
      cb(true);
    }
  })
}

module.exports = delteLike;
