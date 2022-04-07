//* JSON.parse -> z JSON na obiekt
//* JSON.stringify -> z obiektu na JSON (string)

const http = require("http");
import {IncomingMessage, ServerResponse} from "http";
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;

const users = [
  {name: "Adam", id: 1},
  {name: "Ewa", id: 2},
];

http
  .createServer((req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, {"Content-Type": "text/html", charset: "utf-8"});
    switch (req.url) {
      case "/":
        fs.readFile(path.join(__dirname, "index.html"), (err: string, page: string) => {
          console.log("page.toString():", page.toString());
          console.log("err:", err);
          if (err) {
            res.end(`<h1>Error</h1>`);
          } else res.end(page);
        });
        break;

      case "/script.js":
        console.log("Przekazano script.js");
        res.writeHead(200, {"Content-Type": "application/javascript", charset: "utf-8"});
        fs.readFile(path.join(__dirname, "script.js"), (err: string, page: string) => {
          if (err) {
            res.end(`<h1>Error</h1>`);
          } else res.end(page);
        });
        break;

      case "/users":
        fs.readFile(path.join(__dirname, "users.html"), (err: string, page: string) => {
          console.log("page.toString():", page.toString());
          console.log("err:", err);
          if (err) {
            res.end(`<h1>Error</h1>`);
          } else res.end(page);
        });
        break;
      case "/api/users":
        res.writeHead(200, {"Content-Type": "application/json", charset: "utf-8"});
        const usersJSON = JSON.stringify(users);
        res.end(usersJSON);
        break;

      default:
        res.end(`
<h1 style="color: darkMagenta">Strona nie istnieje</h1>
`);
        break;
    }
  })
  .listen(port, "localhost", () => {
    console.log(`Server is working on port ${port}`);
  });
