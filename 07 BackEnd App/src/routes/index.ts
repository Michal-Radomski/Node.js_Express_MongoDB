import express from "express";
var router = express.Router();

const login = "admin";
const password = "123";

/* GET home page. */
router.get("/", (_req, res, _next) => {
  console.log("Server is running - index.ts");
  res.render("index", {title: "Express.JS"});
});

router.get("/login", (_req, res) => {
  res.render("login", {title: "Logowanie"});
});

router.post("/login", (req, res) => {
  console.log("req.body:", req.body);
  const body = req.body;

  if (body.login === login && body.password === password) {
    req.session!.admin = 1;

    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
});

export default router;
