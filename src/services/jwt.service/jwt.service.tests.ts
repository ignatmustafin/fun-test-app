//
// import config from "../../config";
//
// const user = {
//   id: "5fe9b087a562fe70992f7abe",
//   firstname: "John",
//   lastname: "Doe",
// };
// const service = new JwtService(jwtConfig);
//
// describe("testing encoding/decoding token", () => {
//   afterEach(() => {
//     jest.resetAllMocks();
//   });
//
//   test("success", async () => {
//     jest.spyOn(jwt, "sign");
//     jest.spyOn(jwt, "verify");
//     const token = await service.encode(user);
//     expect(jwt.sign).toBeCalled();
//     expect(token).toBeInstanceOf(EncodedAndSignedToken);
//     const decoded = await service.decode(token);
//     expect(jwt.verify).toBeCalled();
//     expect(decoded).toBeInstanceOf(DecodedAndVerifiedToken);
//     expect(decoded.payload).toEqual(user);
//   });
// });
