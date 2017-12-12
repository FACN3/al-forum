const fs = require('fs');

const handler = (path, type, res) => {
  fs.readFile(path, (err, file) => {
    if (err) {
      console.log('error is', err);
        res.writeHead(404, {'Content-Type':'text/html'});
        res.end('Server Error.')
    }
    else {
      res.writeHead(200, {'Content-Type':type});
      res.end(file);
    }
  })
}





module.exports = handler;
