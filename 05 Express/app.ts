const express = require("express");
const app = express();

// console.log("app:", app);

const port = 3000;

app.get(
  "/",
  (
    req: {
      hostname: string;
      ip: string;
      ips: string;
      originalUrl: string;
      path: string;
      protocol: string;
      secure: boolean;
      query: {name: string; surname: string};
    },
    res: {send: (arg0: string) => void}
  ) => {
    console.log("req.hostname:", req.hostname);
    console.log("req.ip:", req.ip);
    console.log("req.ips:", req.ips);
    console.log("req.originalUrl:", req.originalUrl);
    console.log("req.path:", req.path);
    console.log("req.protocol:", req.protocol);
    console.log("req.secure:", req.secure);
    console.log("req.query:", req.query);
    const {name, surname} = req.query;
    console.log(`Hello ${name} ${surname}`);
    res.send("<h1>Hello World!</h1>");
    if (req.protocol !== "https") {
      console.log("Protokół niezabezpieczony");
    }
  }
);

app.all("/hi", (req: {method: string}, res: {send: (arg0: string) => void}) => {
  console.log("req.method:", req.method);
  res.send("<h1>Hi World!</h1>");
});

app.listen(port, "localhost", () => {
  console.log("Server is listening at port:", port);
});
