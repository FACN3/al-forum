const pool = require("./db_connection");

const getLikes = (post_id, cb) => {
  pool.query("select * from likes where post_id=$1", [post_id], (err, res) => {
    if (err) {
      cb(err);

    }else{
      cb(null,res.rows);
    }}
  );
}

module.exports = getLikes;
