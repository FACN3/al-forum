const router = require("./router");
const http = require("http");
const port = process.env.PORT || 30002;
const host = process.env.HOST || "localhost";

const server = http.createServer(router);
server.listen(port, () => {
  console.log(`the port is http://${host}:${port}`);
});
