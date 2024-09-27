/**
 * TODO:
 * @param {*} db
 * @param {*} _request
 * @param {*} response
 * @param {*} _next
 * @returns
 */
export const handleGetWorlds = (db, _request, response, _next) => {
  // return response.send(db.data.worlds || []);
  console.log('db.update is ready?', db.data);
  // return response.send(db.data.worlds);
  // return response.send(db.data);
  return response.send(db);
};
