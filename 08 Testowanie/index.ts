import express from "express";

const app = express();

app.set("x-powered-by", false);

app.get("/", (req, res) => {
  console.log("req.ip:", req.ip);
  res.send("<h1>Hello World!</h1>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is working at port: ${port}`);
});
