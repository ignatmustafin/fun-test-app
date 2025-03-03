// /**
//  * Возвращает данные компании с указанным идентификатором.
//  * @param {string} id
//  * @return {Object|null}
//  */
// function getOne(id) {
//   const mock = {
//     id: 12,
//     contactId: 16,
//     name: "ООО Фирма «Перспективные захоронения»",
//     shortName: "Перспективные захоронения",
//     businessEntity: "ООО",
//     contract: {
//       no: "12345",
//       issue_date: "2015-03-12T00:00:00Z",
//     },
//     type: ["agent", "contractor"],
//     status: "active",
//     photos: [
//       {
//         name: "0b8fc462dcabf7610a91.png",
//         filepath: "0b8fc462dcabf7610a91.png",
//         thumbpath: "0b8fc462dcabf7610a91_160x160.png",
//       },
//     ],
//     createdAt: "2020-11-21T08:03:00Z",
//     updatedAt: "2020-11-23T09:30:00Z",
//   };
//
//   return parseInt(id, 10) === mock.id ? mock : null;
// }
//
// module.exports = { getOne };
