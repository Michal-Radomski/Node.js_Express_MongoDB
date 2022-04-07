const http = require("http");
import {IncomingMessage, ServerResponse} from "http";

const port = process.env.PORT || 3000;

http
  .createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log("req.url:", req.url);
    console.log("req.method:", req.method);
    if (req.url === "/") {
      res.writeHead(200, {"Content-Type": "text/html", charset: "utf-8"});
      res.write(`
      <h1>The Main Page</h1>
      <h1>${req.url}</h1>
      <p>Server is working - port: ${port}</p>
      <script type=application/javascript>
      let name = prompt("What's your name?");
      console.log("name:", name)
      </script>
      `);
      res.end();
    } else if (req.url === "/users") {
      res.writeHead(200, {"Content-Type": "text/html", charset: "utf-8"});
      res.write(`
      <h1>Page of the Users</h1>
      <h1>${req.url}</h1>
      <p>Server is working - port: ${port}</p>
      `);
      res.end();
    } else {
      res.writeHead(404, {"Content-Type": "text/html", charset: "utf-8"});
      //* res.end() zawiera w sobie res.write()
      res.end(`
    <h1>No Such a Page</h1>
    <h1>${req.url}</h1>
    <p>Server is working - port: ${port}</p>
    `);
    }
    // console.log("Server is working");
    // res.write("<h1>Header of the Page</h1>"); //* Można w res.end()
  })
  .listen(port, "localhost", () => {
    console.log(`Server is working - port: ${port}`);
  });
