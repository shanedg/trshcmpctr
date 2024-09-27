import { randomUUID } from 'node:crypto';

/**
 * TODO:
 * @param {Promise<Low>} db
 * @param {*} request
 * @param {*} response
 * @param {*} _next
 * @returns
 */
export const handleLaunchNew = async (db, request, response, _next) => {
  const id = randomUUID();
  // await db;
  console.log('db is ready?', db);

  request.log.debug(`db? ${typeof db}`);
  request.log.debug(`db? ${db}`);
  request.log.debug(`name: ${request.body.name}`);

  // db.then(({ update }) => {
  //   console.log('db is ready?', update);
  //   // update(({ worlds }) => {
  //   //   worlds.push({
  //   //     id,
  //   //     name: request.body.name,
  //   //     status: 'pending'
  //   //   });
  //   // });
  // });

  // await db.update(({ worlds }) => {
  //   worlds.push({
  //     id,
  //     name: request.body.name,
  //     status: 'pending',
  //   });
  // });

  // db.then(value => {
  //   value.update(({ worlds }) => {
  //     worlds.push({
  //       id,
  //       name: request.body.name,
  //       status: 'pending',
  //     });
  //   });
  // });

  // TODO: create the world
  return response
    // 202 Accepted
    .status(202)
    .redirect(`/worlds/${id}`);
};
