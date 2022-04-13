import express from "express";
var router = express.Router();
const News = require("../../models/news");
// import News from "../../models/news";

// console.log("News:", News);

router.all("*", (req, res, next) => {
  if (!req.session!.admin) {
    res.redirect("login");
    return;
  }
  next();
});

router.get("/", (req, res, _next) => {
  const newsData = new News({
    title: "Test title",
    description: "Test description",
  });
  newsData.save((err: string) => {
    console.log("err:", err);
  });

  console.log("req.session!.admin:", req.session!.admin);
  res.render("admin", {title: "Admin"});
});

export default router;
