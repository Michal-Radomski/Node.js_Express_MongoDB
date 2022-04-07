import handleData from "./handleData";
const colors = require("colors/safe");

const handleCommand = ({add, remove, list}: {add: string; remove: string; list: string}) => {
  // console.log(add, remove, list);
  if (add) {
    if (typeof add !== "string") {
      return console.log(colors.red("Wpisz nazwę dodawanego zadania (tekst!!!)"));
    } else if (add.length < 7) {
      return console.log(colors.red("Nazwa zadania musi mieć co najmniej 6 znaków"));
    }
    // console.log("Będę dodawać");
    handleData(1, add);
  } else if (remove) {
    if (typeof remove !== "string" || remove.length < 7) {
      return console.log(colors.red("Wpisz nazwę usuwanego zadania. To musi być string i musi mieć min 7 znaków"));
    }
    // console.log("Będę usuwać");
    handleData(2, remove);
  } else if (list || list === "") {
    handleData(3, null);
    // console.log("Pokażę listę");
  } else {
    console.log(
      colors.yellow('Nie rozumiem polecenia. Użyj --add="nazwa zadania", --remove="nazwa zadania" lub opcji --list')
    );
  }
};

// module.exports = handleCommand;
export default handleCommand;
