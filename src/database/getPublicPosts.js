const pool = require("./db_connection");
const getLikesHelper=require("./getLikesHelper");
const getPublicPosts = result => {
  console.log("get it?",result)

  return new Promise( function(resolve,reject){
  pool.query("SELECT * FROM posts where private = false ORDER BY TimeStamp DeSC;", (err, res) => {
    if (err) {
      reject(err);
    } else {
      getLikesHelper(res,newResult=>{

        console.log(newResult.rows[1].likes);
        console.log("result is",result)
      newResult.username = result;

        resolve(newResult);
      });
    }
  });
  })
};

module.exports = getPublicPosts;
