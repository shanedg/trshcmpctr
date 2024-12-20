import React from 'react';
import { Link, useParams } from 'react-router';

import { useWorldContext } from './Worlds';

export const WorldDetail = () => {
  const { worldId } = useParams();
  const worlds = useWorldContext();
  const thisWorld = worlds?.find(({ id }) => id === worldId);
  return (
    <article>
      <nav>
        <Link to="..">close</Link>
      </nav>
      <h3>{worldId}</h3>
      {thisWorld ? (
        <>
          <p>name: {thisWorld.name}</p>
          <p>status: {thisWorld.status}</p>
        </>
      ) : (
        <p>no world with id={worldId} found</p>
      )}
    </article>
  );
};
