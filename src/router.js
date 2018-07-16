const handler = require("./handler");
const addUser = require("./database/addUser");
const addLike = require("./database/addLike");
const checkUser = require("./database/checkUser");
const getUser = require("./database/getUser");
const addPost = require("./database/addPost");
const getPublicPosts = require("./database/getPublicPosts");
const getPosts = require("./database/getPosts");
const comparePasswordHelper = require("./comparePasswordHelper");
const deletePost = require("./database/deletePost");
const deleteLike = require("./database/deleteLike");
const cookie = require("cookie");
const {validate} = require("./session");
const {parse} = require("url");
const qs = require("querystring");
const isAdmin = require("./database/isAdmin");
const addUserHandler = require("./addUserHandler");
const router = (req, res) => {
  res.end=res.end.bind(res);
  const url = req.url;
  console.log(url);
  const path = {
    "/": "/../public/html/index.html",
    "/wave.gif": "/../public/wave.gif",
    "/signup.html": "/../public/html/signup.html",
    "/login.html": "/../public/html/login.html",
    "/post.html": "/../public/html/post.html",
    "/css/style.css": "/../public/css/style.css",
    "/css/reset.css": "/../public/css/reset.css",
    "/css/mobile.css": "/../public/css/mobile.css",
    "/js/index.js": "/../public/js/index.js",
    "/js/login.js": "/../public/js/login.js",
    "/js/signup.js": "/../public/js/signup.js",
    "/js/post.js": "/../public/js/post.js"
  }[url];

  const type = {
    "/": "text/html",
    "/signup.html": "text/html",
    "/wave.gif": "image/gif",
    "/login.html": "text/html",
    "/post.html": "text/html",
    "/css/style.css": "text/css",
    "/css/reset.css": "text/css",
    "/css/mobile.css": "text/css",
    "/js/index.js": "application/javascript",
    "/js/login.js": "application/javascript",
    "/js/signup.js": "application/javascript",
    "/js/post.js": "application/javascript"
  }[url];

  // console.log(url);
  if (path) {
    handler(__dirname + path, type, res);
  } else if (url.split("?")[0] == "/check_user") {
    console.log(url.split("=")[1]);
    checkUser(url.split("=")[1], (err, result) => {
      if (err)
        return;
      res.writeHead(200, {"content-type": "application/json"});
      res.end(JSON.stringify({state: result}));
    });
  } else if (url == "/add_user") {
    paramets = "";
    req.on("data", chunk => {
      paramets += chunk;
    });
    req.on("end", () => {
      const values = qs.parse(paramets);
      const {username, name, password} = values;
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
      const {username, password} = values;
      comparePasswordHelper(username, password, res);
      console.log(values);
    });
  } else if (url == "/logout") {
    res.writeHead(302, {
      "Set-cookie": `jwt=logged_out`,
      Location: "/"
    });
    res.end();
  } else if (url == "/check_auth") {

    res.writeHead(200, {"content-type": "application/javascript"});
      validate(req.headers.cookie)
      .then(function(username){
        res.end(JSON.stringify({username:username}));
      })
      .catch(function(err){
        res.end(JSON.stringify({username: ""}));
      })


  } else if (url == "/get_posts") {

    res.writeHead(200, {"content-type": "application/javascript"});

      validate(req.headers.cookie)
      .then(getPosts)
      .then(isAdmin)
      .then(JSON.stringify)
      .then(res.end)
      .catch(function(err){
        res.end(JSON.stringify({username: ""}));
      })

  }else if (url=='/get_public_posts'){

getPublicPosts().then(JSON.stringify)
      .then(res.end)
      .catch(function(err){
        res.header("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify({username: ""}));
      })


  } else if (url == "/add_post") {
    let parameters = "";
    req.on("data", chunk => {
      parameters += chunk;
    });
    req.on("end", () => {
      const values = qs.parse(parameters);
      const {title, content,privacy} = values;
      console.log(title,content,privacy);
      //res.end("Check your console please");

      res.writeHead(302, {location: "/post.html"});

      validate(req.headers.cookie).then(function(user_id){

          addPost(title, content, privacy, user_id, success => {
            if (success) {
              res.end();
            } else {
              res.end();
            }
          });

}).catch(res.end);
    });
  } else if (url.split("?")[0] == "/delete_post") {

    res.writeHead(200, {"content-type": "application/json"});

   validate(req.headers.cookie).then(function(user_id){
     deletePost(url.split("=")[1], (err, success) => {
       if (err) {
         res.end(JSON.stringify({deleted: false}));
       } else {
         res.end(JSON.stringify({deleted: true}));

       }

   });
 }).catch(function(err){
     res.end(JSON.stringify({deleted: false}));

   });


  } else if (url.split("?")[0] == "/delete_like") {
    validate(req.headers.cookie).then((user_id) => {

        res.writeHead(200, {"content-type": "application/json"});
        deleteLike(url.split("=")[1], user_id, (result) => {
          res.end(JSON.stringify({done: true}));

        });
    }).catch(function(err){
        res.end(JSON.stringify({done: false}));

      });
  } else if (url.split("?")[0] == "/like_post") {

    validate(req.headers.cookie).then((user_id) => {
        res.writeHead(200, {"content-type": "application/json"});

        addLike(user_id, url.split("=")[1], 0, (result) => {
          res.end(JSON.stringify({done: true}));

        });
    }).catch(function(err){
        res.end(JSON.stringify({done: false}));

      });

  } else {
    res.writeHead(404);
    res.end("page not found");
  }
};

module.exports = router;
