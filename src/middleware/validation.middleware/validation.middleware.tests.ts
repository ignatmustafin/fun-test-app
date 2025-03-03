// const request = require("supertest");
// const { Router } = require("express");
// const expressValidator = require("express-validator");
// const httpCodes = require("../../constants/http-codes");
// const { app } = require("../../app");
// const { errorsHandler } = require("../error-handler.middleware");
// const validate = require("./index");
//
// const { check } = expressValidator;
//
// const validationTestRoute = "/routeWithValidation";
//
// const validationTest = [check("someEmail").isEmail(), validate];
//
// beforeAll(() => {
//   const router = Router();
//   router.get(validationTestRoute, ...validationTest, (req, res) =>
//     res.json(req.query)
//   );
//   app.use(`/`, router);
//   app.use(...errorsHandler);
// });
//
// test("success: 200 validation passed", async () => {
//   const response = await request(app).get(validationTestRoute).query({
//     someEmail: "john@doe.com",
//   });
//   expect(response.status).toEqual(httpCodes.OK);
//   expect(response.body).toEqual({
//     someEmail: "john@doe.com",
//   });
// });
//
// test("error: 422 validation failed", async () => {
//   const response = await request(app).get(validationTestRoute).query({
//     someEmail: "incorrectEmailAddress",
//   });
//   expect(response.status).toEqual(httpCodes.UNPROCESSABLE_ENTITY);
//   expect(response.body).toEqual({
//     code: "UNPROCESSABLE_ENTITY",
//     message: "Illegal request params values",
//   });
// });
