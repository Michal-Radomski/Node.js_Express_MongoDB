const express = require("express");

const app = express();

const port: number = 3000;

app.listen(port, "localhost", () => {
  console.log(`Server is listening at port: ${port}`);
});
