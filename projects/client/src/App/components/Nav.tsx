import { Link } from 'react-router';

import { LogoutLink } from './LogoutLink';

export const Nav = () => {
  return (
    <nav>
      <ul className="navigation-list">
        <li>
          <Link to="/new">new</Link>
        </li>
        <li>
          <Link to="/worlds">worlds</Link>
        </li>
        <li>
          <Link to="/game">game</Link>
        </li>
        <li>
          <LogoutLink />
        </li>
      </ul>
    </nav>
  );
};
