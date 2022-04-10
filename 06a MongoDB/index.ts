const mongo = require("mongodb");

const client = new mongo.MongoClient("mongodb://localhost:27017", {useNewUrlParser: true});

client.connect((err: string) => {
  if (err) {
    console.log("Błąd połączenia", err);
  } else {
    console.log("Połączenie Ok");
    const db = client.db("test");
    const cars = db.collection("cars");

    // cars.insertOne({
    //   brand: "Fiat",
    //   model: "126p",
    // });

    // cars.deleteOne({
    //   _id: mongo.ObjectId("625353669ed493f711bcf0d6"),
    // });

    // console.log("cars: ", cars);

    cars.find({}).toArray((err: string, result: Object) => {
      if (err) {
        console.log("Błąd", err);
      } else {
        console.log("result:", result);
      }
    });

    setTimeout(() => {
      client.close();
      console.log("Połączenie zakończone");
    }, 500);
  }
});
