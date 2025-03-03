// /* eslint-disable security/detect-non-literal-fs-filename */
// const _ = require("lodash");
// const request = require("supertest");
// const { app } = require("../../../../app");
// const v = require("../../../../config").prefix;
// const httpCodes = require("../../../../constants/http-codes");
// const contactMethods = require("../../../../DB/sample-db/methods/contact");
// // todo: данные используемые с БД
// // const { database } = require("../../../../services/database.service");
// // const { contact1 } = require("./tests.data/contacts");
// const requestAuth = require("../../../../middleware/request-auth.middleware");
// const { Unauthorized } = require("../../../../constants/errors");
//
// jest.mock("../../../../middleware/request-auth.middleware");
//
// const requestBody = {
//   lastname: "Grimes",
//   firstname: "Rick",
// };
//
// describe("testing PATCH /contacts/:id", () => {
//   beforeAll(async () => {
//     // todo: установка соединения с тестовой БД
//     // await database.connect();
//     // @todo: загрузка тестовых данных в БД
//   });
//
//   afterAll(async () => {
//     // todo: удаление тестовых данных из тестовой БД
//     // todo: закрытие соединения с БД
//     // await database.disconnect();
//     jest.restoreAllMocks();
//   });
//
//   describe("with authorization", () => {
//     beforeAll(() => {
//       requestAuth.isAuthorized.mockImplementation((req, res, next) => next());
//     });
//
//     afterAll(() => {
//       jest.resetAllMocks();
//     });
//
//     test("error: 404 contact not found", async () => {
//       const { status, body } = await request(app)
//         .patch(`/${v}/contacts/1`)
//         .send(requestBody);
//
//       expect(status).toBe(httpCodes.NOT_FOUND);
//       expect(body).toEqual({
//         code: "NOT_FOUND",
//         message: "Contact not found",
//       });
//     });
//
//     test("error: 422 id parameter has incorrect format", async () => {
//       const { status, body } = await request(app)
//         .patch(`/${v}/contacts/abc`)
//         .send(requestBody);
//
//       expect(status).toBe(httpCodes.UNPROCESSABLE_ENTITY);
//       expect(body).toEqual({
//         code: "UNPROCESSABLE_ENTITY",
//         message: "id: parameter has incorrect format",
//       });
//     });
//
//     test("error: 500 internal server error", async () => {
//       jest.spyOn(contactMethods, "editOne").mockImplementationOnce(() => {
//         throw new Error();
//       });
//       const { status, body } = await request(app)
//         .patch(`/${v}/contacts/16`)
//         .send(requestBody);
//
//       expect(status).toBe(httpCodes.INTERNAL_ERROR);
//       expect(body).toEqual({
//         code: "INTERNAL_ERROR",
//         message: "Internal unexpected server error",
//       });
//     });
//
//     test("success", async () => {
//       const { status, body } = await request(app)
//         .patch(`/${v}/contacts/16`)
//         .send(requestBody);
//
//       const expected = {
//         id: 16,
//         lastname: "Grimes",
//         firstname: "Rick",
//         patronymic: "Петрович",
//         phone: "79162165588",
//         email: "grigoriev@funeral.com",
//         createdAt: "2020-11-21T08:03:26.589Z",
//         updatedAt: expect.any(String),
//       };
//       expect(body).toEqual(expected);
//       expect(status).toEqual(httpCodes.OK);
//     });
//   });
//
//   describe("without authorization", () => {
//     beforeAll(() => {
//       requestAuth.isAuthorized.mockImplementation((req, res, next) =>
//         next(new Unauthorized())
//       );
//     });
//
//     afterAll(() => {
//       jest.resetAllMocks();
//     });
//
//     test("error: 401 unauthorized", async () => {
//       const { status, body } = await request(app)
//         .patch(`/${v}/contacts/16`)
//         .send(requestBody);
//
//       expect(status).toBe(httpCodes.UNAUTHORIZED);
//       expect(body).toEqual({
//         code: "UNAUTHORIZED",
//         message: "Unauthorized request",
//       });
//     });
//   });
// });
