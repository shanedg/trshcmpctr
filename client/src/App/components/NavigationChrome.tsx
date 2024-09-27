import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { getBreadcrumbs } from '../utils/get-breadcrumbs';

export function NavigationChrome() {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <>
      {breadcrumbs && (
        <nav>
          {breadcrumbs.map((path, index) => (
            <Link to={path} key={`${index}-${path}`}>{path}</Link>
          ))}
          {/* TODO: relative navigation? i.e. back or up? */}
          {/* TODO: automatically list child paths? */}
        </nav>
      )}
      <p>you are on {location.pathname}</p>
      <Outlet />
    </>
  );
}
