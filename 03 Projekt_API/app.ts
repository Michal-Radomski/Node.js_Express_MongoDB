//* Command to run: npm run nodemon

const Fetch = require("node-fetch");

console.log("test");
// Co wpisaliśmy
console.log("process.argv:", process.argv);

Fetch("http://numbersapi.com/random/2022?json");
