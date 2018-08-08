const pool = require("./db_connection");

const isAdmin = (array) => {
  return new Promise(function(resolve,reject){
  pool.query(
    "SELECT admin FROM users WHERE username=$1",
    [array.username],
    (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log("dmin how,",res.rows.length)
        array.admin = res.rows[0].admin;
        resolve(array);
      }
    }
  );
  })
};

module.exports = isAdmin;
