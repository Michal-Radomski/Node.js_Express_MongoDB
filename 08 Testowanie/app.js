const express = require("express");

const app = express();

app.set("x-powered-by", false);

app.get("/", (req, res) => {
  console.log("req.ip:", req.ip);
  // res.send("Hello World!");
  res.send("<h1>Hello World!</h1>");
});

exports.app = app;
