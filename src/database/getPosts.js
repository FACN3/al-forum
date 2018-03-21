const pool = require("./db_connection");
const getLikesHelper=require("./getLikesHelper");
const getPosts = cb => {
  pool.query("SELECT * FROM posts ORDER BY TimeStamp DeSC;", (err, res) => {
    if (err) {
      cb(err);
      console.log(err);
    } else {
      getLikesHelper(res,newResult=>{
        console.log(newResult.rows[1].likes);
        cb(null, newResult);
      });
    }
  });
};

module.exports = getPosts;
