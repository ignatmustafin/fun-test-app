//
// /**
//  * Редактирует данные компании с указанным идентификатором
//  * и возвращает результат.
//  * @param {string} id
//  * @param {Object} data
//  * @return {Object}
//  */
// function editOne(id, data) {
//   const mock = getOne(id);
//
//   const updated = { ...mock };
//   Object.keys(data).forEach((key) => {
//     updated[`${key}`] = data[`${key}`];
//   });
//   updated.updatedAt = new Date();
//
//   return updated;
// }
//
// module.exports = { editOne };
