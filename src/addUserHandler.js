const {hashPassword} = require("./hash.js")
const addUser = require("./database/addUser.js")
const addUserHelper = (username, name, password, res) => {
 hashPassword(password, (error, hash) => {
    if(error){
     res.writeHead(500);
     res.end();
   } else {
     addUser(username, hash, name, (added) => {
        if(added){
          res.writeHead(302,{"Location":"/login.html"});
          res.end();
          console.log('Login...')
        } else {
          res.writeHead(500);
          res.end();
        }
     });
   }
 });
}


module.exports = addUserHelper;
