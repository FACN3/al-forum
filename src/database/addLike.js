const pool = require("./db_connection");

const addLike=(user_id,post_id,type,cb)=>{
  pool.query(
    "INSERT INTO likes(user_id,post_id,type) VALUES ($1, $2, $3);",
    [user_id,post_id,type],
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

module.exports=addLike;
