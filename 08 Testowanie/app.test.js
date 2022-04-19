// it("adds 2 and 2", () => {
//   expect(2 + 2).toEqual(4);
// });

// it("adds 2 and 2 in a wrong way", () => {
//   expect(2 + 2).toEqual(3);
// });

const request = require("supertest");
const {app} = require("./app.js");

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
