console.log("Test");

const question = document.querySelector("#question");
// const answer1 = document.querySelector("#answer1");
// const answer2 = document.querySelector("#answer2");
// const answer3 = document.querySelector("#answer3");
// const answer4 = document.querySelector("#answer4");

const gameBoard = document.querySelector("#game-board");
const h2 = document.querySelector("h2");

function fillQuestionElements(data) {
  if (data.winner === true) {
    gameBoard.style.display = "none";
    h2.innerText = "WYGRAŁEŚ/AŚ!!!";
    return;
  }

  if (data.loser === true) {
    gameBoard.style.display = "none";
    h2.innerText = "Nie poszło tym razem, spróbuj ponownie.";
    return;
  }

  question.innerText = data.question;

  //* Zamiast pisać 4x querySelector("#answer1")
  for (const i in data.answers) {
    // console.log("i:", i);
    const answerEl = document.querySelector(`#answer${Number(i) + 1}`); //*  bo i jest string
    answerEl.innerText = data.answers[i];
  }
}

function showNextQuestion() {
  fetch("/question", {
    method: "GET",
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("data:", data);
      fillQuestionElements(data);
    });
}

showNextQuestion();

const goodAnswersSpan = document.querySelector("#good-answers");

function handleAnswerFeedback(data) {
  goodAnswersSpan.innerText = data.goodAnswers;
  showNextQuestion();
}

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: "POST",
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("data:", data);
      handleAnswerFeedback(data);
    });
}

const buttons = document.querySelectorAll(".answer-btn");
for (const button of buttons) {
  button.addEventListener("click", (event) => {
    console.log("Button wciśnięty");
    const answerIndex = event.target.dataset.answer;
    console.log("answerIndex:", answerIndex);
    sendAnswer(answerIndex);
  });
}

// const tipDiv = document.querySelector('#tip');

// function handleFriendsAnswer(data) {
//     tipDiv.innerText = data.text;
// }

function callToAFriend() {
  fetch("/help/friend", {
    method: "GET",
  })
    .then((repr) => repr.json())
    .then((data) => {
      console.log("data:", data);
      handleFriendsAnswer(data);
    });
}

// document.querySelector('#callToAFriend').addEventListener('click', callToAFriend);

// function handleHalfOnHalfAnswer(data) {
//     if (typeof data.text === 'string') {
//         tipDiv.innerText = data.text;
//     } else {
//         for (const button of buttons) {
//             if (data.answersToRemove.indexOf(button.innerText) > -1) {
//                 button.innerText = '';
//             }
//         }
//     }
// }

// function halfOnHalf() {
//     fetch('/help/half', {
//         method: 'GET',
//     })
//         .then(r => r.json())
//         .then(data => {
//             handleHalfOnHalfAnswer(data);
//         });
// }

// document.querySelector('#halfOnHalf').addEventListener('click', halfOnHalf);

// function handleCrowdAnswer(data) {
//     if (typeof data.text === 'string') {
//         tipDiv.innerText = data.text;
//     } else {
//         data.chart.forEach((percent, index) => {

//             buttons[index].innerText = `${buttons[index].innerText}: ${percent}%`;

//         });
//     }
// }

// function questionToTheCrowd() {
//     fetch('/help/crowd', {
//         method: 'GET',
//     })
//         .then(r => r.json())
//         .then(data => {
//             handleCrowdAnswer(data);
//         });
// }

// document.querySelector('#questionToTheCrowd').addEventListener('click', questionToTheCrowd);
