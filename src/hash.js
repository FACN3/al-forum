const bcrypt = require("bcryptjs");

const hashPassword = (password, callback) => {
  bcrypt.hash(password, 10, (error, hash)  => {
    if(error){
      callback(error);
    } else {
      callback(null, hash);
    }
  });
};

const comparePasswords = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, (error, res) => {
    if(error){
      callback(error);
    } else {
      callback(null, res);
    }
  });
};








module.exports = {
  hashPassword,
  comparePasswords
};
