import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", (_req, res, _next) => {
  // console.log("Server is running - index.ts");
  res.render("quiz", {title: "Quiz"});
});

export default router;
