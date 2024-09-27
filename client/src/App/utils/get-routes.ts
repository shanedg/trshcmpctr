import { RouteObject } from 'react-router-dom';

import type { NamedRoutes } from '../constants/named-routes';

/**
 * Transform named routes into a list of route objects for react-router-dom browser router
 * @param routes Named routes
 * @returns A list of routes for browser router
 */
export function getRoutes(routes: NamedRoutes): RouteObject[] {
  const childRoutes: RouteObject[] = [];
  for (const childPath in routes) {
    const { children, ...namedRoute } = routes[childPath];
    if (children) {
      childRoutes.push({
        ...namedRoute,
        children: getRoutes(children),
        path: childPath,
      });
      // Skip the following push because it's already handled
      continue;
    }
    // Push a children-less version of the route if not handled above
    childRoutes.push({
      ...namedRoute,
      path: childPath,
    });
  }
  return childRoutes;
}
