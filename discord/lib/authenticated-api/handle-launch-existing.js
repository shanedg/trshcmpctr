/**
 * TODO:
 * @param {*} request
 * @param {*} response
 * @param {*} _next
 */
export const handleLaunchExisting = (db, request, response, _next) => {
  const id = request.params.id;
  db.update(({ worlds }) => {
    const found = worlds.find(w => w.id = id);
    if (found) {
      found.state = 'pending';
      // TODO: restore the world
      return response
        // 202 Accepted
        .status(202)
        .redirect(`/worlds/${id}`);
    }
    return response
      .status(404)
      .redirect('/worlds');
  });
};
