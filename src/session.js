const secret = "akejrfiuearbfviuserb";

const jwt = require("jsonwebtoken");

module.exports = {
  sign: (username, res) => {
    const signedCookie = jwt.sign(username, secret);
    res.writeHead(302, {
      "set-cookie": `jwt=${signedCookie}`,
      Location: "/"
    });
    res.end();
  },

  validate: (cookie, res) => {
    if (cookie.jwt) {
      jwt.verify(cookie.jwt, secret, (err, result) => {
        if (err) {
          res.writeHead(200);
          res.end(JSON.stringify({ username: "" }));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ username: result }));
        }
      });
    }
  }
};
