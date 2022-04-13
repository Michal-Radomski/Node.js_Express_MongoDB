import express from "express";
var router = express.Router();

import Quiz from "../../models/quiz";

router.get("/", (req, res, _next) => {
  const show = !req!.session!.vote;

  Quiz.find({}, (_err, data) => {
    let sum = 0;
    data.forEach((item) => {
      sum += item.vote;
    });
    res.render("quiz", {title: "Quiz", data, show, sum});
  });
});

router.post("/", (req, res) => {
  const id = req.body.quiz;

  Quiz.findOne({_id: id}, (_err: string, data: {vote: number; save: (arg0: (_err: string) => void) => void}) => {
    data.vote = data.vote + 1;
    data.save((_err: string) => {
      req!.session!.vote = 1;

      res.redirect("/quiz");
    });
  });
});

export default router;
