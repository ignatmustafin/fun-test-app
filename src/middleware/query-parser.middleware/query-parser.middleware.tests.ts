// const request = require("supertest");
// const { Router } = require("express");
// const httpCodes = require("../../constants/http-codes");
// const { app } = require("../../app");
// const { errorsHandler } = require("../error-handler.middleware");
// const queryParser = require("./index");
//
// const filterTestRoute = "/routeWithFiltering";
//
// beforeAll(() => {
//   const router = Router();
//   router.get(filterTestRoute, queryParser.parseJson("jsonField"), (req, res) =>
//     res.json(req.query.jsonField)
//   );
//   app.use(`/`, router);
//   app.use(...errorsHandler);
// });
//
// describe("filter parsing", () => {
//   test("success: 200 correct filter", async () => {
//     const response = await request(app)
//       .get(filterTestRoute)
//       .query({
//         jsonField: { name: "value" },
//       });
//     expect(response.status).toEqual(httpCodes.OK);
//     expect(response.body).toEqual({ name: "value" });
//   });
//
//   test("error: 400 incorrect filter format", async () => {
//     const response = await request(app).get(
//       `${filterTestRoute}?jsonField={name:}`
//     );
//     expect(response.status).toEqual(httpCodes.BAD_REQUEST);
//     expect(response.body).toEqual({
//       code: "BAD_REQUEST",
//       message: "Malformed request syntax",
//     });
//   });
// });
