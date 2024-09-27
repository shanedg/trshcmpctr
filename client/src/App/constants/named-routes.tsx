import React from 'react';

import { ErrorCard } from '../components/ErrorCard';
import { Home } from '../components/Home';
import { NavigationChrome } from '../components/NavigationChrome';
import { NewWorld } from '../components/NewWorld';
import { WorldDetail } from '../components/WorldDetail';
import { Worlds } from '../components/Worlds';

import type { RouteObject } from 'react-router-dom';

export type NamedRoute = Pick<RouteObject, 'element' | 'errorElement'>;

export type NamedRouteWithChildren = NamedRoute & {
  children?: Record<string, NamedRouteWithChildren>;
}

export type NamedRoutes = Record<string, NamedRouteWithChildren>;

// TODO: react-router-dom route error response handling?
// or error boundary above router provider (not currently working)?
// or both?
// (1) react-router-dom errorElement handles rendering AND loaders & actions;
// (2) regular error boundary might not catch errors thrown in loaders & actions?
// TODO: proposal ->
// (1) checks to see if `isRouteErrorResponse` is true and renders more specific error;
// (1) rethrows if `isRouteErrorResponse` is false and those errors are caught by (2) ???

// function RootBoundary() {
//   const error = useRouteError() as Error;
//   if (isRouteErrorResponse(error)) {
//     return <ErrorCard error={error} />;
//   }
//   return <ErrorCard error={new Error('Problem rendering this page')} />;
// }

export const namedRoutes: NamedRoutes = {
  '/': {
    children: {
      '/': {
        element: <Home />,
      },
      '/worlds': {
        children: {
          // TODO: do parameters specifically need to be "relative", i.e. no leading slash?
          ':worldId': {
            element: <WorldDetail />,
            errorElement: <ErrorCard error={Error('Problem rendering WorldDetail')} />,
          },
        },
        element: <Worlds />,
        errorElement: <ErrorCard error={Error('Problem rendering Worlds')} />,
      },
      '/new': {
        element: <NewWorld />,
        errorElement: <ErrorCard error={Error('Problem rendering NewWorld')} />,
      },
    },
    element: <NavigationChrome />,
    errorElement: <ErrorCard error={Error('Problem rendering application')} />,
  },
};
