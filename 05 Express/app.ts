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
    res.send("<h1>Hello World!</h1>"); //* send = write + end (z Node.js) Dodaje też nagłówek z kodowaniem
    //* Dane wejściowe mogą być text/html, array/object lub Buffer
    if (req.protocol !== "https") {
      console.log("Protokół niezabezpieczony");
    }
  }
);

app.get("/abc", (_req: any, res: {location: (arg0: string) => void; sendStatus: (arg0: number) => void}) => {
  res.location("/123");
  res.sendStatus(302); //* przekierowanie trwałe
});

app.get("/def", (_req: any, res: {redirect: (arg0: number, arg1: string) => void}) => {
  res.redirect(301, "https://www.google.com"); //* przekierowanie nietrwałe
});

app.all("/hi", (req: {method: string}, res: {write: (arg0: string) => void; end: () => void}) => {
  console.log("req.method:", req.method);
  res.write("<h1 style='color:red'>Hi World!</h1>");
  res.end();
});

app.listen(port, "localhost", () => {
  console.log("Server is listening at port:", port);
});

//* Podstawowe ścieżki REST - i tak dla wszystkich poleceń: GET, POST, PATH, DELETE
// app.post("/", (_req: string) => {
//   console.log("Dodawanie nowej osoby");
// });

//* Parametry ścieżek
// app.post("/:name/:surname", (_req: string) => {
//   console.log("Dodawanie nowej osoby");
// });
app.get("/article/:id/:tile?", (req: {params: string}) => {
  console.log("req.params:", req.params);
});
