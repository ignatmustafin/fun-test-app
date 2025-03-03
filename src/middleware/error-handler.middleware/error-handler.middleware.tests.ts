// const { Router } = require("express");
// const httpCodes = require("../../constants/http-codes");
// const {
//   InternalError,
//   Unauthorized,
//   BadRequest,
//   UnprocessableEntity,
// } = require("../../constants/errors");
// const v = require("../../config").prefix;
// const { app } = require("../../app");
// const { errorsHandler } = require("./index");
// const JwtService = require("../../services/jwt.service");
// import jwtConfig from "../../config";
//
// const jsonParseErrorRoute = "/jsonparse";
// const badRequestErrorRoute = "/badrequest";
// const unprocessableEntityRoute = "/unprocessable";
// const unauthorizedErrorRoute = "/unauthorized";
// const internalErrorRoute = "/intenalerror";
// const unknownErrorRoute = "/unknownerror";
// const token = `Bearer ${
//   new JwtService(jwtConfig).encode({
//     id: "60472125addc158c1ec2b1cf",
//     username: "username",
//   }).data
// }`;
//
// beforeAll(() => {
//   const router = Router();
//   router.get(jsonParseErrorRoute, () => {});
//   router.get(badRequestErrorRoute, () => {
//     throw new BadRequest();
//   });
//   router.get(unprocessableEntityRoute, () => {
//     throw new UnprocessableEntity();
//   });
//   router.get(unauthorizedErrorRoute, () => {
//     throw new Unauthorized();
//   });
//   router.get(internalErrorRoute, () => {
//     throw new InternalError();
//   });
//   router.get(unknownErrorRoute, () => {
//     throw new Error();
//   });
//
//   app.use(`/`, router);
//   app.use(...errorsHandler);
// });
//
// describe("error: 400 bad request", () => {
//   test("json parse error", async () => {
//     const response = await request(app)
//       .get(jsonParseErrorRoute)
//       .set("Authorization", token)
//       .send('{"invalid"}')
//       .type("json");
//     expect(response.status).toEqual(httpCodes.BAD_REQUEST);
//     expect(response.body).toEqual({
//       code: "BAD_REQUEST",
//       message: "Malformed request syntax",
//     });
//   });
// });
//
// describe("error: 422 unprocessable entity", () => {
//   test("unprocessable entity error", async () => {
//     const response = await request(app)
//       .get(unprocessableEntityRoute)
//       .set("Authorization", token);
//     expect(response.status).toEqual(httpCodes.UNPROCESSABLE_ENTITY);
//     expect(response.body).toEqual({
//       code: "UNPROCESSABLE_ENTITY",
//       message: "Illegal request params values",
//     });
//   });
// });
//
// describe("error: 401 unauthorized", () => {
//   test("not authorized request error", async () => {
//     const response = await request(app)
//       .get(unauthorizedErrorRoute)
//       .set("Authorization", token);
//     expect(response.status).toEqual(httpCodes.UNAUTHORIZED);
//     expect(response.body).toEqual({
//       code: "UNAUTHORIZED",
//       message: "Unauthorized request",
//     });
//   });
// });
//
// describe("error: 500 internal error", () => {
//   test("some error happened", async () => {
//     const response = await request(app)
//       .get(unknownErrorRoute)
//       .set("Authorization", token);
//     expect(response.status).toEqual(httpCodes.INTERNAL_ERROR);
//     expect(response.body).toEqual({
//       code: "INTERNAL_ERROR",
//       message: "Internal unexpected server error",
//     });
//   });
//
//   test("internal error happened", async () => {
//     const response = await request(app)
//       .get(internalErrorRoute)
//       .set("Authorization", token);
//     expect(response.status).toEqual(httpCodes.INTERNAL_ERROR);
//     expect(response.body).toEqual({
//       code: "INTERNAL_ERROR",
//       message: "Internal unexpected server error",
//     });
//   });
// });
