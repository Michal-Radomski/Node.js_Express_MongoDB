const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

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

//* Przesyłanie plików
app.get("/moon", (_req: any, res: {set: (arg0: string, arg1: string) => void; send: (arg0: string) => void}) => {
  res.set("Content-Type", "text/html");
  res.send(`
  <!DOCTYPE html>
  <html>
  <body>
  <img src="picture" width="100%"/>
  </body>
  </html>
  
  `);
});

app.get(
  "/picture",
  (_req: any, res: {sendFile: (arg0: string, arg1: {root: any; lastModified: boolean; dotfiles: string}) => void}) => {
    const fileName = "Moon_4.jpg"; //* Plikiem może być index.html
    res.sendFile(fileName, {
      root: path.join(__dirname, "image"),
      lastModified: false,
      dotfiles: "ignore",
    });
  }
);

//* Middleware

//* Nie działa?
app.use(express.json());
app.post("/hello", (req: {body: {name2: string; surname2: string}}, res: {send: (arg0: string) => void}) => {
  const {name2, surname2} = req.body;
  res.send(`Witaj ${name2} ${surname2}`);
  console.log("req.body:", req.body);
});

//* Middleware nr 2
app.use(express.static(path.join(__dirname, "image")));

//* Middleware nr 3 -> cookie-parser
app.use(cookieParser());

// ---------------------

app.get(
  "/hi/:name",
  (
    req: {params: {name: string}; cookies: string},
    res: {cookie: (arg0: string, arg1: string, arg2: {expires: Date}) => void; send: (arg0: string) => void}
  ) => {
    const {name} = req.params;
    res.cookie("visitor_name", name, {
      expires: new Date(Date.now() + 10 * 60 * 1000), //* cookie will be removed after 10 minutes
    });
    res.send(
      `<h2 style='color: darkMagenta'>Imię: <span style='font-weight: bolder; font-style: italic; color: red; text-decoration: underline;'>${name}</span> zapisano</h2>`
    );
    console.log("req.cookies:", req.cookies);
  }
);
