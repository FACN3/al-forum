const pool = require('./db_connection');

const addUser = (username, password, name) => {
  pool.query("INSERT INTO USERS(username, password, name) VALUES ($1, $2, $3);",
    [username, password, name], (err,res)=> {
      if (err) {
        console.log(err);
      } else {
        console.log('success');
      }
    });
}








module.exports = addUser;
