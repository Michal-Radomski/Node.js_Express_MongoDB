import {Request, Response} from "express";

function gameRoutes(app: any) {
  let goodAnswers: number = 0;
  let isGameOver: boolean = false;
  let callToAFriendUsed: boolean = false;
  let questionToTheCrowdUsed: boolean = false;
  let fiftyFiftyUsed: boolean = false;

  const questions = [
    {
      question: "Jaki jest najlepszy język programowania na świecie wg mnie?",
      answers: ["C++", "Fortran", "JavaScript", "Java"],
      correctAnswer: 2,
    },
    {
      question: "Czy ten kurs jest fajny?",
      answers: ["Nie wiem", "Oczywiście, że tak", "Nie", "Jest najlepszy"],
      correctAnswer: 3,
    },
    {
      question: "Czy chcesz zjeść pizzę?",
      answers: ["Nawet dwie!", "Jestem na diecie", "Nie, dziękuję", "Wolę brokuły"],
      correctAnswer: 0,
    },
  ];

  app.get("/question", (_req: Request, res: Response) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true,
      });
    } else {
      const nextQuestion = questions[goodAnswers];
      const {question, answers} = nextQuestion;

      res.json({
        question: question,
        answers: answers,
      });
    }
  });

  app.post("/answer/:index", (req: Request, res: Response) => {
    if (isGameOver) {
      res.json({
        loser: true,
      });
    }

    const {index} = req.params;
    console.log("index:", index);

    const question = questions[goodAnswers];

    const isGoodAnswer = question.correctAnswer === Number(index);
    console.log("isGoodAnswer:", isGoodAnswer);

    if (isGoodAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }

    res.json({
      correct: isGoodAnswer,
      goodAnswers: goodAnswers,
    });
  });

  app.get("/help/friend", (_req: Request, res: Response) => {
    if (callToAFriendUsed) {
      return res.json({
        text: "To koło ratunkowe było już wykorzystane.",
      });
    }
    callToAFriendUsed = true;

    const doesFriendKnowAnswer = Math.random() <= 0.5;

    const question = questions[goodAnswers];

    res.json({
      text: doesFriendKnowAnswer
        ? `Hmm, wydaje mi się, że odpowiedź to ${question.answers[question.correctAnswer]}`
        : "Hmm, no nie wiem...",
    });
  });

  app.get("/help/half", (_req: Request, res: Response) => {
    if (fiftyFiftyUsed) {
      return res.json({
        text: "To koło ratunkowe było już wykorzystane.",
      });
    }

    fiftyFiftyUsed = true;

    const question = questions[goodAnswers];

    const answersCopy = question.answers.filter((_answer, index) => index !== question.correctAnswer);

    answersCopy.splice(~~(Math.random() * answersCopy.length), 1); //* ~~ -> Math.floor()
    // console.log("answersCopy:", answersCopy);

    res.json({
      answersToRemove: answersCopy,
    });
  });

  app.get("/help/crowd", (_req: Request, res: Response) => {
    if (questionToTheCrowdUsed) {
      return res.json({
        text: "To koło ratunkowe było już wykorzystane.",
      });
    }

    questionToTheCrowdUsed = true;

    const chart = [10, 20, 30, 40];

    for (let i: number = chart.length - 1; i > 0; i--) {
      const change = Math.floor(Math.random() * 20 - 10); //* Może być zamiast Math.floor() -> ~~

      chart[i] += change;
      chart[i - 1] -= change;
    }

    const question = questions[goodAnswers];
    const {correctAnswer} = question;

    [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]];

    res.json({
      chart: chart,
    });
  });
}

module.exports = gameRoutes;
