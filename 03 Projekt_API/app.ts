//* Command to run: npm run nodemon

//* Zadanie 1
// const Fetch = require("node-fetch");

// // console.log("test");
// // Co wpisaliśmy
// const year: number | string = process.argv[2] || Math.floor(Math.random() * 2022);

// Fetch(`http://numbersapi.com/${year}/year?json`)
//   .then((response: any) => {
//     //* W jednej lini to nie trzeba return
//     // console.log("response:", response);
//     console.log("response.status:", response.status);
//     console.log("response.ok", response.ok);
//     return response.json();
//   })
//   .then((data: string) => console.log("data:", data))
//   .catch((error: string) => console.log("error:", error));

//* Zadanie 2
//* URL: `http://numbersapi.com/${number}/${type}?json`
// console.log(process.argv);

const Fetch = require("node-fetch");
const arg = process.argv[2];
let type = "";

if (arg.indexOf("--year") === 0) {
  console.log("Szukamy informacji o roku ...");
  type = "year";
} else if (arg.indexOf("--math") === 0) {
  console.log("Szukamy informacji o liczbie...");
  type = "math";
} else if (arg.indexOf("--trivia") === 0) {
  console.log("Szukamy liczby-ciekawostki...");
  type = "trivia";
}

const equalSign: number = arg.search("=");
// console.log(equalSign);
if (equalSign === -1) console.log("Nie wpisałeś liczby!");

const number = arg.slice(equalSign + 1);
console.log("number:", number);

if (number === "" || isNaN(Number(number))) {
  console.log("To nie jest liczba!");
  process.exit();
}

Fetch(`http://numbersapi.com/${number}/${type}?json`)
  .then((response: {ok: boolean; json: () => void; status: string}) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Oooo, coś nie tak: " + response.status);
    }
  })
  .then((response: {text: string}) => console.log(response.text))
  .catch((err: string) => console.log("Błąd: ", err));

//* Zadanie 3
