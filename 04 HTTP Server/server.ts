const http = require("http");
import {IncomingMessage, ServerResponse} from "http";

http
  .createServer((_req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is working");
    res.writeHead(200, {"Content-Type": "text/html", charset: "utf-8"});
    // res.write("<h1>Header of the Page</h1>");
    res.end(`
    <h1>Header of the Page</h1>
    <p>Server is working</p>
    <script type=application/javascript>
    let name = prompt("What's your name?");
    console.log("name:", name)
    </script>
    `);
  })
  .listen(3000, "localhost");
