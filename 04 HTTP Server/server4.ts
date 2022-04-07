const http = require("http");
import {IncomingMessage, ServerResponse} from "http";

const port = process.env.PORT || 3000;

let reqNumber = 0;

http
  .createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log(`Server is running at ${port}`);
    if (req.url === "/favicon.ico") {
      res.end();
      return;
    }
    reqNumber++;
    for (let i = 0; i <= 50000; i++) {
      console.log(reqNumber + " -> " + i);
    }

    res.writeHead(200, {"Content-Type": "text/html", charset: "utf-8"});
    res.write(`<h1>Request number: ${reqNumber}</h1>`);
    res.end();
  })
  .listen(port, "localhost");
