const {MongoClient} = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url: string = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName: string = process.env.DBNAME || "test";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to Mongo DB server");
  const db = client.db(dbName);
  const collectionCars = await db.collection("cars").find().toArray();
  const collectionTodos = await db.collection("todos").find().toArray();
  console.log("collectionCars:", collectionCars);
  console.log("collectionTodos:", collectionTodos);

  return "Done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    client.close();
    console.log("Connection to the MongoDB closed");
  });
