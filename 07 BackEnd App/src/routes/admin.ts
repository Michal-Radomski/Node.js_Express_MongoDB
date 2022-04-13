import express from "express";
var router = express.Router();
// const News = require("../../models/news");
import News from "../../models/news";

// console.log("News:", News);

router.all("*", (req, res, next) => {
  if (!req.session!.admin) {
    res.redirect("login");
    return;
  }
  next();
});

router.get("/", (req, res, _next) => {
  // const newsData = new News({
  //   title: "Test title",
  //   description: "Test description",
  // });
  // newsData.save((err: string) => {
  //   console.log("err:", err);
  // });

  // console.log("req.session!.admin:", req.session!.admin);

  News.find({}, (_err, data) => {
    console.log("data:", data);
    res.render("admin/indexAdmin", {title: "Admin", data});
  });
});

router.get("/news/add", (_req, res) => {
  res.render("admin/news-form", {title: "Dodaj news", body: {}, errors: {}});
});

router.post("/news/add", (req, res) => {
  const body = req.body;
  const newsData = new News(body);
  const errors = newsData.validateSync();

  newsData.save((err: string) => {
    if (err) {
      res.render("admin/news-form", {title: "Dodaj news", errors, body});
      return;
    }
    res.redirect("/admin");
  });
});

router.get("/news/delete/:id", (req, res) => {
  News.findByIdAndDelete(req.params.id, (_err: string) => {
    res.redirect("/admin");
  });
});

export default router;
