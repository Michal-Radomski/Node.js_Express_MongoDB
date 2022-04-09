import {Request, Response} from "express";

function gameRoutes(app: {get: (arg0: string, arg1: (_req: Request, res: Response) => void) => void}) {
  let goodAnswers: number = 0;
  let callToAFriend: boolean = false;
  let questionToTheCrowdUsed: boolean = false;
  let fiftyFifty: boolean = false;

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
}
