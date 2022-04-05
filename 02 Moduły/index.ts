const fs = require("fs");
const path = require("path");
const os = require("os");

console.log("---Początek----------");
// Access
fs.access("./names.txt", (err: string) => {
  console.log(err ? "Plik nie istnieje" : "Plik istnieje");
});

fs.access("./names.txt", fs.constants.W_OK, (err: string) => {
  console.log(err ? "Pliku nie można zapisać" : "Plik można zapisać");
});

// Rename
// fs.rename("names.txt", "imiona.txt", (err: string) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("Nazwa zmieniona");
//   }
// });

// RenameSync
// try {
//   fs.renameSync("names.txt", "imiona.txt");
//   console.log("OK");
// } catch (err) {
//   console.log(err);
// }

// ReadDirSync
// console.log(fs.readdirSync("./"));
// ReadDir
// fs.readdir("./", (err: string, files: string[]) => {
//   if (err) {
//     console.log("Błąd:", err);
//   }
//   console.log("Zawartość: ", files);
// });

// ReadFile - domyślne kodowanie: null
fs.readFile("names.txt", "utf8", (err: string, data: string) => {
  if (err) {
    throw Error(err);
  }
  console.log(data);
});

// ReadFileSync
const names = fs.readFileSync("names.txt", "utf8");
console.log("names:", names);

// WriteFile -> nadpisuje - domyślne kodowanie: utf8
// fs.writeFile("names.txt", "Nowy plik", (err: string) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Udało się zapisać");
//   }
// });

// AppendFile - dodaje do pliku, domyślne kodowanie: utf8
// const names2: string = "Jan, Jerzy";
// fs.readFile("users.txt", "utf8", (err: string, data: string) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
//   fs.appendFile("names.txt", data, (err: string) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("Udało się dopisać w pliku");
//   });
// });

// Path
const pathToFile = path.join(__dirname, "index.ts");
console.log("pathToFile:", pathToFile);

const parse = path.parse(__filename);
console.log("parse:", parse);
console.log(path.isAbsolute("./index.ts"));

// OS
const uptime = os.uptime();
console.log("uptime:", uptime);
const homedir = os.homedir();
console.log("homedir:", homedir);
