const { comparePassword } = require("./hash.js");
const getPassword = require("./database/getPassword");
const { sign } = require("./session");
module.exports = (username, password, res) => {
  getPassword(username, (err, hashedPassword) => {
    if (err) {
      console.log(err);
    } else {
      console.log(hashedPassword);

      comparePassword(password, hashedPassword, (err, result) => {
        if (err) return console.log(err);
        if (result) {
          sign(username, res);
        } else {
          res.writeHead(200);
          res.end("Password Doesn't match");
        }
      });
    }
  });

  //comparePassword();
};
