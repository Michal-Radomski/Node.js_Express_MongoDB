const mongo = require("mongodb");
import {ObjectId} from "mongodb";

const client = new mongo.MongoClient("mongodb://localhost:27017", {useNewUrlParser: true});

interface ObjectDB extends Object {
  deleteMany: (arg0: {done: boolean}, arg1: (err: string) => void) => void;
  deleteOne: (arg0: {_id: ObjectId}, arg1: (err: string) => void) => void;
  updateOne: (arg0: {_id: ObjectId}, arg1: {$set: {done: boolean}}, arg2: (err: string) => void) => void;
  find: (arg0: {}) => {(): void; new (): void; toArray: {(arg0: (err: string, todos: ToDo[]) => void): void; new (): void}};
  insertOne: (arg0: {title: string; done: boolean}, arg1: (err: string) => void) => void;
}

interface ToDo {
  _id: ObjectId;
  title: string;
  done: boolean;
}

function addNewTodo(todosCollection: ObjectDB, title: string) {
  todosCollection.insertOne(
    {
      title: title,
      done: false,
    },
    (err: string) => {
      if (err) {
        console.log("Błąd podczas dodawania!", err);
      } else {
        console.log("Zadanie dodane.");
      }
      setTimeout(() => {
        client.close();
        console.log("Połączenie zakończone");
      }, 500);
    }
  );
}

function showAllTodos(todosCollection: ObjectDB) {
  todosCollection.find({}).toArray((err: string, todos: ToDo[]) => {
    if (err) {
      console.log("Błąd podczas pobierania!", err);
    } else {
      // console.log("todos", todos);

      const todosToDo = todos.filter((todo) => !todo.done);
      const todosDone = todos.filter((todo) => todo.done);

      console.log(`# Lista zadań do zrobienia (niezakończone): ${todosToDo.length}`);

      for (const todo of todosToDo) {
        console.log(`- [${todo._id}] ${todo.title}`);
      }
      console.log(`# Lista zadań zrobionych (zakończone): ${todosDone.length}`);
      for (const todo of todosDone) {
        console.log(`- [${todo._id}] ${todo.title}`);
      }
    }

    setTimeout(() => {
      client.close();
      console.log("Połączenie zakończone");
    }, 500);
  });
}

function markTaskAsDone(todosCollection: ObjectDB, id: string) {
  todosCollection
    .find({
      _id: mongo.ObjectID(id),
    })
    .toArray((err, todos) => {
      if (err) {
        console.log("Błąd podczas pobierania!", err);
      } else if (todos.length !== 1) {
        console.log("Nie ma takiego zadania!");
        client.close();
      } else if (todos[0].done) {
        console.log("To zadanie było już zakończone!");
        client.close();
      } else {
        todosCollection.updateOne(
          {
            _id: mongo.ObjectID(id),
          },
          {
            $set: {
              done: true,
            },
          },
          (err: string) => {
            if (err) {
              console.log("Błąd podczas ustawiania zakończenia!", err);
            } else {
              console.log("Zadanie oznaczone jako zakończone.");
            }
            setTimeout(() => {
              client.close();
              console.log("Połączenie zakończone");
            }, 500);
          }
        );
      }
    });
}

function deleteTask(todosCollection: ObjectDB, id: string) {
  todosCollection
    .find({
      _id: mongo.ObjectID(id),
    })
    .toArray((err, todos) => {
      if (err) {
        console.log("Błąd podczas pobierania!", err);
      } else if (todos.length !== 1) {
        console.log("Nie ma takiego zadania!");
        client.close();
      } else {
        todosCollection.deleteOne(
          {
            _id: mongo.ObjectID(id),
          },
          (err) => {
            if (err) {
              console.log("Błąd podczas usuwania!", err);
            } else {
              console.log("Zadanie zostało usunięte.");
            }
            setTimeout(() => {
              client.close();
              console.log("Połączenie zakończone");
            }, 500);
          }
        );
      }
    });
}

function deleteAllDoneTasks(todosCollection: ObjectDB) {
  todosCollection.deleteMany(
    {
      done: true,
    },
    (err) => {
      if (err) {
        console.log("Błąd podczas usuwania!", err);
      } else {
        console.log("Wyczyszczono zakończone zadania, o ile takie były.");
      }
      setTimeout(() => {
        client.close();
        console.log("Połączenie zakończone");
      }, 500);
    }
  );
}

function doTheToDo(todosCollection: ObjectDB) {
  // const args = process.argv.splice(2);
  // console.log("args:", args);
  const [command, ...args] = process.argv.splice(2);
  // console.log("command:", command, "args:", args);

  switch (command) {
    case "add":
      addNewTodo(todosCollection, args[0]);
      break;
    case "list":
      showAllTodos(todosCollection);
      break;
    case "done":
      markTaskAsDone(todosCollection, args[0]);
      break;
    case "delete":
      deleteTask(todosCollection, args[0]);
      break;
    case "cleanup":
      deleteAllDoneTasks(todosCollection);
      break;
    default:
      console.log(`
#### Lista TO DO - MongoDB ####

Dostępne komendy:

add <nazwa zadania> - dodaje zadanie do wykonania
list - wyświetl zadania
done <id zadania> - oznacz wybrane zadanie jako zakończone
delete <id zadania> - usuń wybrane zadanie
cleanup - usuń zakończone zadania, jeżeli istnieją
`);
      setTimeout(() => {
        client.close();
        console.log("Połączenie zakończone");
      }, 500);
      break;
  }
}

client.connect((err: string) => {
  if (err) {
    console.log("Błąd połączenia", err);
  } else {
    console.log("Połączenie Ok");
    const db = client.db("test");
    const todosCollection = db.collection("todos");
    doTheToDo(todosCollection);

    setTimeout(() => {
      client.close();
      console.log("Połączenie zakończone");
    }, 500);
  }
});
