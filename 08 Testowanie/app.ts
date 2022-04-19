const express = require("express");
// import express from "express";
import {Request, Response} from "express";

const app = express();

app.set("x-powered-by", false);

app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  // res.send("Hello World!");
  res.send("<h1>Hello World!</h1>");
});

app.post("/", (_req: Request, res: Response) => {
  res.send(`Create`);
});
app.put("/:id", (req: Request, res: Response) => {
  res.send(`Change: ${req.params.id}`);
});
app.delete("/:id", (req: Request, res: Response) => {
  res.send(`Delete: ${req.params.id}`);
});

app.get("*", (_req: Request, res: Response) => {
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
