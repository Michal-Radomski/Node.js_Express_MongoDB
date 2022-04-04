const add = (x: number, y: number): number => x + y;
const division = (number1: number, number2: number): number => number1 / number2;

const math = (a: number, b: number, callback: (a: number, b: number) => number) => {
  console.log(callback(a, b));
};

math(3, 4, add);
math(4, 2, division);

// setTimeout(() => console.log("Hey"), 1000);
// console.log("Hey2");

const fs = require("fs");
fs.readFile("./text.txt", "utf8", (err: string | null, file: string) => {
  console.log(err, file);
});
console.log("test1");
