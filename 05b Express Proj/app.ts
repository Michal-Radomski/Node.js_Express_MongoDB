const express = require("express");
const path = require("path");

const gameRoutes = require("./routes/games");

const app = express();

const port: number = 3000;

app.listen(port, "localhost", () => {
  console.log(`Server is listening at port: ${port}`);
});

app.use(express.static(path.join(__dirname, "public")));

gameRoutes(app);
