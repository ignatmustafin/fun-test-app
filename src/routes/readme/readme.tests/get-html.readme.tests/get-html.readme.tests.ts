// const request = require("supertest");
// const { app } = require("../../../../app");
// const { prefix } = require("../../../../config");
// const httpCodes = require("../../../../constants/http-codes");
// const readmeService = require("../../readme.service");
// const { OK } = require("../../../../constants/http-codes");
//
// describe(`testing GET /`, () => {
//   test("error: 500 internal server error", async () => {
//     jest.spyOn(readmeService, "renderPage").mockImplementationOnce(() => {
//       throw new Error();
//     });
//     const response = await request(app).get(`/${prefix}`);
//
//     expect(response.status).toBe(httpCodes.INTERNAL_ERROR);
//     expect(response.body).toEqual({
//       code: "INTERNAL_ERROR",
//       message: "Internal unexpected server error",
//     });
//   });
//
//   test("success", async () => {
//     const response = await request(app).get(`/${prefix}`);
//
//     expect(response.status).toEqual(OK);
//     expect(response.text).toMatch(/<html>.+/gi);
//   });
// });
