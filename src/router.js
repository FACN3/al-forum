const handler = require("./handler");
const addUser = require("./database/addUser");
const checkUser = require("./database/checkUser");
const getUser = require("./database/getUser");
const addPost = require("./database/addPost");
const getPosts = require("./database/getPosts");
const {parse} = require('url');

const router = (req, res) => {
  const url = req.url;
  const path = {"/" : "/../public/html/index.html",
        "/signup.html" : "/../public/html/signup.html",
        "/login.html" : "/../public/html/login.html",
        "/css/style.css" : "/../public/css/style.css",
        "/css/reset.css" : "/../public/css/reset.css",
        "/js/index.js" : "/../public/js/index.js",
        "/js/login.js" : "/../public/js/login.js",
        "/js/signup.js" : "/../public/js/signup.js"}[url]

 const type = {"/" : "text/html",
        "/signup.html" : "text/html",
        "/login.html" : "text/html",
        "/css/style.css" : "text/css",
        "/css/reset.css" : "text/css",
        "/js/index.js" : "application/javascript",
        "/js/login.js" : "application/javascript",
        "/js/signup.js" : "application/javascript"}[url]


  // console.log(url);
  if (path) {
    handler(__dirname + path, type, res);

  } else if (url.split('?')[0]=="/check_user"){
    console.log(url.split('=')[1]);
    checkUser(url.split('=')[1], (result)=>{

           res.writeHead(200,{'content-type':"application/json"});
           res.end(JSON.stringify({'state':result}));
        
    })
  } else if(url=="/add_user"){
      paramets="";
      req.on('data',(chunk)=>{
        paramets+=chunk;
      });
      req.on('end',()=>{
        console.log(paramets);
        res.end();
      })

  }else {
    res.writeHead(404);
    res.end("page not found");
  }
};

module.exports = router;
