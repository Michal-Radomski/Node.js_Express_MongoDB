import {MongoClient, ObjectId} from "mongodb";

const url: string = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName: string = process.env.DBNAME || "test";

describe("Inserting", () => {
  beforeAll(async () => {
    await client.connect();
    console.log("Connected successfully to Mongo DB server");
    const db = client.db(dbName);
    const collectionCars = await db.collection("cars").find().toArray();
    const collectionTodos = await db.collection("todos").find().toArray();
    console.log("collectionCars:", collectionCars);
    console.log("collectionTodos:", collectionTodos);
    return "Done";
  });

  it("Should insert a doc into a Car collection", async () => {
    const db = client.db(dbName);
    const collectionCars = await db.collection("cars");

    const mockCar = {_id: 'ObjectId("62532210defb48e39dd281c7")' as unknown as ObjectId, name: "Toyota", model: "Corolla"};

    await collectionCars.insertOne(mockCar);

    const insertedUser = await collectionCars.findOne({_id: 'ObjectId("62532210defb48e39dd281c7")'});
    expect(insertedUser).toEqual(mockCar);
  });

  afterAll(async () => {
    await client.close();
    console.log("Connection to the MongoDB closed");
  });
});
