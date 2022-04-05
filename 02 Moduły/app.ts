var colors = require("colors/safe");
const notes = require("./notes.ts");
console.log("notes:", notes);

console.log(colors.green("hello")); // outputs green text
console.log(colors.red.underline("i like cake and pies")); // outputs red underlined text
console.log(colors.inverse("inverse the color")); // inverses the color
console.log(colors.rainbow("OMG Rainbows!")); // rainbow
console.log(colors.trap("Run the trap")); // Drops the bass
// console.log("colors: ", colors);

console.log("Jestem w module app");
console.log("Nodemon was added and is being used");
