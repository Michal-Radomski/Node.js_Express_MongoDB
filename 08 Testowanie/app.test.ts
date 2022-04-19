// it("adds 2 and 2", () => {
//   expect(2 + 2).toEqual(4);
// });

// it("adds 2 and 2 in a wrong way", () => {
//   expect(2 + 2).toEqual(3);
// });

describe("adds 3/4 and 3/4", () => {
  test("test1", () => {
    console.log("test1");
    expect(3 + 3).toEqual(6);
  });
  test("test2", () => {
    console.log("test2");
    expect(4 + 4).toEqual(8);
  });
});

const request = require("supertest");
// const {app} = require("./app.js");
// const app = require("./app");
import app from "./app";

// it("works", () => {
//   const response = request(app).get("/");
//   console.log("response:", response);
// });

// it("works", (done) => {
//   const response = request(app)
//     .get("/")
//     .expect((res) => {
//       console.log("res:", res);
//     })
//     .end((error, res) => {
//       if (error) {
//         return done(error);
//       }
//       done();
//     });
//   // console.log("response:", response);
// });

// it("works", async () => {
//   const response = await request(app).get("/");
//   // .get("/")
//   // .expect((res) => {
//   //   console.log("res:", res);
//   // })
//   // .end((error, res) => {
//   //   if (error) {
//   //     return done(error);
//   //   }
//   //   done();
//   // });
//   console.log("response:", response);
// });

// it("works", async () => {
//   const response = await request(app).get("/");
//   // console.log("response:", response);
//   expect(response).toMatchSnapshot();
// });

it("works", async () => {
  const response = await request(app).get("/");
  // console.log("response:", response);
  expect(response.status).toEqual(200);
  expect(response.text).toEqual("<h1>Hello World!</h1>");
});

// it.skip("handles pages that are not found", async () => {
//   const response = await request(app).get("/whatever");
//   expect(response.status).toEqual(404);
//   expect(response.text).toMatchSnapshot();
//   expect(response.text).toEqual("Not Found");
// });
it("handles pages that are not found", async () => {
  const response = await request(app).get("/whatever");
  expect(response.status).toEqual(404);
  expect(response.text).toMatchSnapshot();
  expect(response.text).toEqual("Not Found");
});
