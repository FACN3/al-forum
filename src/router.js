const handler = require('./handler');
const addUser = require('./database/addUser');
const checkUser = require('./database/checkUser');
const getUser = require ('./database/getUser')
const router = (req, res) => {
  const url = req.url;
  if (url === '/') {
    handler(__dirname + '/../index.html','text/html',res);
    getUser('abchhhef',(result)=>{
      console.log(result);
    });
  } else {
    res.writeHead(404);
    res.end('page not found');
  }
}




module.exports = router;
