const mongo = require("mongodb");

const client = new mongo.MongoClient("mongodb://localhost:27017", {useNewUrlParser: true});

client.connect((err: string) => {
  if (err) {
    console.log("Błąd połączenia", err);
  } else {
    console.log("Połączenie Ok");
    const db = client.db("test");
    const todosCollection = db.collection("todos");

    setTimeout(() => {
      client.close();
      console.log("Połączenie zakończone");
    }, 500);
  }
});
