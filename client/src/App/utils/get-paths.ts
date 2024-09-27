import type { NamedRoutes } from '../constants/named-routes';

function getIsNotAChildRoot(path: string) {
  return path !== '/';
}

function withLeadingSlash(path: string) {
  if (path.startsWith('/')) {
    return path;
  }
  return '/' + path;
}

function withPrefix(prefix: string, path: string) {
  // Ignore the root as a prefix to avoid double slashes
  if (prefix === '/') {
    return path;
  }
  return prefix + path;
}

/**
 * Traverse the provided routes to return a list of supported paths
 * @param routes Named routes
 * @returns A list of all paths
 */
export function getPaths(routes?: NamedRoutes) {
  // Base case, no children
  if (!routes) {
    return [] as string[];
  }
  const childPaths: string[] = [];
  for (const path in routes) {
    childPaths.push(path);
    const prefixedChildrenPaths = getPaths(routes[path].children)
      // Avoid duplicating parent path when child path is "/"
      // i.e. avoid "/some-path" and "/some-path/", preserve the former
      .filter(getIsNotAChildRoot)
      // Normalize child paths that start with parameters
      // for the purpose of assembling path segments
      .map(withLeadingSlash)
      // Prefix child paths with parent path
      .map(withPrefix.bind(null, path));
    childPaths.push(...prefixedChildrenPaths);
  }
  return childPaths;
}
