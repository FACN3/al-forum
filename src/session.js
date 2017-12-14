const env = require('env2')('config.env');
const secret = process.env.SECRET;
const jwt = require("jsonwebtoken");

module.exports = {
  sign: (username, res) => {
    const signedCookie = jwt.sign(username, secret);
    res.writeHead(302, {
      "set-cookie": `jwt=${signedCookie}`,
      Location: "/post.html"
    });
    res.end();
  },

  validate: (cookie, cb) => {
    if (cookie.jwt) {
      jwt.verify(cookie.jwt, secret, (err, result) => {
        if (err) {
          cb(err);
        } else {
          cb(null, result);
        }
      });
    }
  }
};
