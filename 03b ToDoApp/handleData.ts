const colors = require("colors/safe");
const fs = require("fs");

const handleData = (type: number, title: string | null) => {
  // type - number (1 - add, 2 - remove, 3 - list)
  // const data = fs.readFileSync("dataDB.json", "utf8"); //* Może być data=data.toString(); niżej to samo!
  const data = fs.readFileSync("dataDB.json");
  let tasks = JSON.parse(data);
  console.log("tasks:", tasks);

  if (type === 1 || type === 2) {
    const isExisted = tasks.find((task: {title: string | null}) => task.title === title) ? true : false;
    if (type === 1 && isExisted) {
      return console.log(colors.yellow.bgBlue("Takie zadanie już istnieje"));
    } else if (type === 2 && !isExisted) {
      return console.log(colors.yellow.bgMagenta("Nie mogę usuwać zadania, które nie istnieje"));
    }
  }

  let dataJSON = "";

  switch (type as number) {
    case 1:
      // console.log("Dodaję zadanie");

      // Przebudowa tablicy:
      console.log("tasks:", tasks);
      tasks = tasks.map((task: {title: string | null}, index: number) => ({
        id: index + 1,
        title: task.title,
      }));
      console.log("tasks:", tasks);

      const id = tasks.length + 1;
      tasks.push({id: id, title: title});
      console.log("tasks:", tasks);
      dataJSON = JSON.stringify(tasks);
      console.log("dataJSON:", dataJSON);
      fs.writeFileSync("./dataDB.json", dataJSON);
      console.log(colors.white.bgGreen(`Dodaję zadanie do bazy: ${title}`));
      break;
    case 2:
      // console.log("Usuwam zadnie");
      const index: number = tasks.findIndex((task: {title: string | null}) => task.title === title);
      tasks.splice(index, 1);

      // Przebudowa tablicy
      console.log("tasks:", tasks);
      tasks = tasks.map((task: {title: string | null}, index: number) => ({
        id: index + 1,
        title: task.title,
      }));
      console.log("tasks:", tasks);

      dataJSON = JSON.stringify(tasks);
      fs.writeFile("./dataDB.json", dataJSON, "utf8", (err: string) => {
        if (err) throw err;
      });
      console.log(colors.white.bgRed(`Zadanie zostało usunięte z bazy: ${title}`));
      break;
    case 3:
      console.log(`Lista zadań do zrobienie obejmuje ${tasks.length} pozycji. Do zrobienia masz: `);
      if (tasks.length > 0) {
        tasks.forEach((task: {title: string | null}, index: number) => {
          if (index % 2) {
            return console.log(colors.green(task.title));
          } else {
            return console.log(colors.yellow(task.title));
          }
        });
      }
      break;
  }
};

// module.exports = handleData;
export default handleData;
