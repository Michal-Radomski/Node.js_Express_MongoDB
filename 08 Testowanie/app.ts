// const express = require("express");
import express from "express";

const app = express();

app.set("x-powered-by", false);

app.get("/", (req, res) => {
  console.log("req.ip:", req.ip);
  // res.send("Hello World!");
  res.send("<h1>Hello World!</h1>");
});

app.post("/", (_req, res) => {
  res.send(`Create`);
});
app.put("/:id", (req, res) => {
  res.send(`Change: ${req.params.id}`);
});
app.delete("/:id", (req, res) => {
  res.send(`Delete: ${req.params.id}`);
});

app.get("*", (_req, res) => {
  res.status(404);
  res.send("Not Found");
});

// app.use((err, _req, res, _next) => {
//   console.log("Error Test");
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// exports.app = app;
export default app;
