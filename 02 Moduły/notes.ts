console.log("Jestem w module notes");

console.log("exports1:", exports === module.exports);
module.exports = {txt: "return by module.exports"};
// console.log("exports:", exports);
// console.log("exports2:", exports === module.exports);
// console.log("__dirname:", __dirname);
// console.log("require:", require);
// console.log("module:", module);
