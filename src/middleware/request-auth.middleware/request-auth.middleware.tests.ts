// const request = require("supertest");
// const { Router } = require("express");
// const config = require("../../config");
// const httpCodes = require("../../constants/http-codes");
// const { app } = require("../../app");
// const { isAuthorized } = require("./index");
// const { errorsHandler } = require("../error-handler.middleware");
// const JwtService = require("../../services/jwt.service");
// const {
//   EncodedAndSignedToken,
// } = require("../../services/jwt.service/jwt.service.token");
//
// const authRequestTestRoute = "/routeWithAuthorization";
//
// beforeAll(() => {
//   const router = Router();
//   router.get(authRequestTestRoute, isAuthorized, (req, res) => {
//     res.json(req.payload);
//   });
//
//   app.use(`/`, router);
//   app.use(...errorsHandler);
// });
//
// afterAll(() => {
//   jest.restoreAllMocks();
// });
//
// test("success: 200", async () => {
//   const user = {
//     id: "60472125addc158c1ec2b1cf",
//     username: "username",
//   };
//   const response = await request(app)
//     .get(authRequestTestRoute)
//     .set(
//       "Authorization",
//       `Bearer ${new JwtService(config.jwt).encode(user).data}`
//     );
//   expect(response.status).toEqual(httpCodes.OK);
//   expect(response.body).toEqual({ id: user.id });
// });
//
// test("error: 401 authorization token verification failed", async () => {
//   const configWithWrongSecretKey = {
//     ...config.jwt,
//     secretKey: "wrongSecretKey",
//   };
//   const token = new EncodedAndSignedToken(configWithWrongSecretKey, {
//     id: "60472125addc158c1ec2b1cf",
//     username: "username",
//   }).data;
//   const response = await request(app)
//     .get(authRequestTestRoute)
//     .set("Authorization", `Bearer ${token}`);
//   expect(response.status).toEqual(httpCodes.UNAUTHORIZED);
//   expect(response.body).toEqual({
//     code: "UNAUTHORIZED",
//     message: "Unauthorized request",
//   });
// });
//
// test("error: 401 authorization token incorrect format", async () => {
//   const token = new JwtService(config.jwt).encode({
//     id: "60472125addc158c1ec2b1cf",
//     username: "username",
//   }).data;
//   let response = await request(app)
//     .get(authRequestTestRoute)
//     .set("Authorization", `${token}`);
//   expect(response.status).toEqual(httpCodes.UNAUTHORIZED);
//   expect(response.body).toEqual({
//     code: "UNAUTHORIZED",
//     message: "Unauthorized request",
//   });
//   response = await request(app)
//     .get(authRequestTestRoute)
//     .set("Authorization", `Bearer ${token} smth else`);
//   expect(response.status).toEqual(httpCodes.UNAUTHORIZED);
//   expect(response.body).toEqual({
//     code: "UNAUTHORIZED",
//     message: "Unauthorized request",
//   });
//   response = await request(app)
//     .get(authRequestTestRoute)
//     .set("Authorization", { token: "isObject" });
//   expect(response.status).toEqual(httpCodes.UNAUTHORIZED);
//   expect(response.body).toEqual({
//     code: "UNAUTHORIZED",
//     message: "Unauthorized request",
//   });
// });
