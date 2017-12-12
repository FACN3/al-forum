const handler = require('./handler');

const router = (req, res) => {
  const url = req.url;
  if (url === '/') {
    handler(__dirname + '/../index.html','text/html',res) 
  }
}




module.exports = router;
