import express from "express";
var router = express.Router();

router.all("*", (req, res, next) => {
  if (!req.session!.admin) {
    res.redirect("login");
    return;
  }
  next();
});

router.get("/", (req, res, _next) => {
  console.log("req.session!.admin:", req.session!.admin);
  res.render("admin", {title: "Admin"});
});

export default router;
