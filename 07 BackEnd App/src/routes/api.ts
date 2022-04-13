import express from "express";
const router = express.Router();
import News from "../../models/news";

let defaultSort = -1;

/* GET home page. */
router.get("/", (req, res) => {
  const search = req.query.search || "";
  let sort = req.query.sort || defaultSort;

  if (sort != 1) {
    console.log("sort:", typeof sort, sort);
    sort = defaultSort;
  }

  console.log("sort:", sort);
  //@ts-ignore
  const findNews = News.find({title: new RegExp(search.trim(), "i")}).sort({created: sort});
  // .select("_id title description");

  findNews.exec((_err, data) => {
    res.json(data);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const findNews = News.findById(id).select("_id title description");

  findNews.exec((_err, data) => {
    res.json(data);
  });
});

export default router;
