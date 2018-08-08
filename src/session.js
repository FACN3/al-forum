const env = require('env2')('config.env');
const secret = process.env.SECRET;
const jwt = require("jsonwebtoken");
const cookie=require("cookie");
module.exports = {
  sign: (username, res) => {
    const signedCookie = jwt.sign(username, secret);
    res.writeHead(302, {
      "set-cookie": `jwt=${signedCookie}`,
      Location: "/post.html"
    });
    res.end();
  },

  validate: (cookieClient) => {

    return new Promise(function(resolve, reject) {
       var cookies = (cookie.parse(cookieClient)).jwt;
      if (cookies) {
        jwt.verify(cookies, secret, (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            console.log("valdation about to resolve",result);
            resolve(result);
          }

        });
      }
    });

      /*
    if (cookie.jwt) {
      jwt.verify(cookie.jwt, secret, (err, result) => {
        if (err) {
          cb(err);
        } else {
          cb(null, result);
        }
      });
    }
    */
    }
  };
