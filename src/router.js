const handler = require("./handler");
const addUser = require("./database/addUser");
const checkUser = require("./database/checkUser");
const getUser = require("./database/getUser");
const addPost = require("./database/addPost");
const getPosts = require("./database/getPosts");
const comparePasswordHelper = require("./comparePasswordHelper");

const { parse } = require("url");
const qs = require("querystring");

const addUserHandler = require("./addUserHandler");
const router = (req, res) => {
  const url = req.url;
    console.log(url);
  const path = {"/" : "/../public/html/index.html",
        "/wave.gif" : "/../public/wave.gif",
        "/signup.html" : "/../public/html/signup.html",
        "/login.html" : "/../public/html/login.html",
        "/css/style.css" : "/../public/css/style.css",
        "/css/reset.css" : "/../public/css/reset.css",
        "/css/mobile.css" : "/../public/css/mobile.css",
        "/js/index.js" : "/../public/js/index.js",
        "/js/login.js" : "/../public/js/login.js",
        "/js/signup.js" : "/../public/js/signup.js"}[url]

 const type = {"/" : "text/html",
        "/signup.html" : "text/html",
        "/wave.gif" : "image/gif",
        "/login.html" : "text/html",
        "/css/style.css" : "text/css",
        "/css/reset.css" : "text/css",
        "/css/mobile.css" : "text/css",
        "/js/index.js" : "application/javascript",
        "/js/login.js" : "application/javascript",
        "/js/signup.js" : "application/javascript"}[url]

  // console.log(url);
  if (path) {
    handler(__dirname + path, type, res);
  } else if (url.split("?")[0] == "/check_user") {
    console.log(url.split("=")[1]);
    checkUser(url.split("=")[1], result => {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ state: result }));
    });
  } else if (url == "/add_user") {
    paramets = "";
    req.on("data", chunk => {
      paramets += chunk;
    });
    req.on("end", () => {
      const values = qs.parse(paramets);
      const { username, name, password } = values;
      addUserHandler(username, name, password, res);
      console.log(values);
    });
  } else if (url == "/login") {
    paramets = "";
    req.on("data", chunk => {
      paramets += chunk;
    });
    req.on("end", () => {
      const values = qs.parse(paramets);
      const { username, password } = values;
      comparePasswordHelper(username, password, res);
      console.log(values);
    });
  } else if (url == "/logout") {
    res.writeHead(302, {
      "Set-cookie": `jwt=logged_out`,
      Location: "/"
    });
    res.end();
  } else {
    res.writeHead(404);
    res.end("page not found");
  }
};

module.exports = router;
