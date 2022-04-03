const os = require("os");
console.log("os.totalmem():", os.totalmem());
console.log("os.type():", os.type());

const http = require("http"); //import http from "http"
const server = http.createServer((_req: any, res: any) => {
  // console.log("_req.url", _req.url, "res", res);
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end("<h1>Hello Node!</h1>");
});
server.listen(5500, "127.0.0.1", () => console.log("server started"));
