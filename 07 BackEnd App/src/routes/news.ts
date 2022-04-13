import express from "express";
var router = express.Router();

import News from "../../models/news";

/* GET home page. */
router.get("/", (req, res, _next) => {
  // console.log("Server is running - index.ts");

  console.log("req.query:", req.query);
  const search = req.query.search || "";

  const findNews = News
    //@ts-ignore
    .find({title: new RegExp(search.trim(), "i")})
    .sort({created: -1}); //* Sortowanie malejąco

  findNews.exec((_err, data) => {
    // console.log("data:", data);
    res.render("news", {title: "News", data, search});
  });
});

export default router;
