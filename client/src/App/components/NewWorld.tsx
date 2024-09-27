import React from 'react';
import { Link } from 'react-router-dom';

import { LogoutLink } from './LogoutLink';

export const NewWorld = () => {
  return (
    <>
      <nav>
        <ul className="navigation-list">
          <li>
            <Link to="/">back</Link>
          </li>
          <li>
            <LogoutLink />
          </li>
        </ul>
      </nav>
      <article>
        <h2>new</h2>
        <form method="post" action="/api/v1/launch">
          <label htmlFor="label">name</label>
          <input type="text" name="name" defaultValue="" placeholder="name" />
          <button type="submit">create</button>
        </form>
      </article>
    </>
  );
};
