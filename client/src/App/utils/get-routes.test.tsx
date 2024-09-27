import React from 'react';

import { getRoutes } from './get-routes';

describe('getRoutes', () => {
  it('handles a named route with no children', () => {
    expect(getRoutes({
      '/': {
        element: <>root</>,
      }
    })).toStrictEqual([
      {
        element: <>root</>,
        path: '/',
      }
    ]);
  });

  it('handles a named route with one child', () => {
    expect(getRoutes({
      '/': {
        children: {
          '/worlds': {
            element: <>worlds</>,
          },
        },
        element: <>root</>,
      }
    })).toStrictEqual([
      {
        children: [
          {
            element: <>worlds</>,
            path: '/worlds',
          },
        ],
        element: <>root</>,
        path: '/',
      }
    ]);
  });

  it('handles a named route with a child that has its own children', () => {
    expect(getRoutes({
      '/':{
        element: <>root</>,
        children: {
          '/worlds': {
            children: {
              ':world': {
                element: <>world detail</>,
              }
            },
            element: <>worlds</>,
          },
        },
      }
    })).toStrictEqual([
      {
        children: [
          {
            children: [
              {
                element: <>world detail</>,
                path: ':world',
              },
            ],
            element: <>worlds</>,
            path: '/worlds',
          },
        ],
        element: <>root</>,
        path: '/',
      }
    ]);
  });

  it('handles a named route with a child with a child with a child', () => {
    expect(getRoutes({
      '/': {
        children: {
          '/worlds': {
            children: {
              ':world': {
                children: {
                  '/settings': {
                    element: <>settings</>,
                  }
                },
                element: <>world detail</>,
              }
            },
            element: <>worlds</>,
          },
        },
        element: <>root</>,
      }
    })).toStrictEqual([
      {
        children: [
          {
            children: [
              {
                path: ':world',
                element: <>world detail</>,
                children: [
                  {
                    path: '/settings',
                    element: <>settings</>,
                  },
                ],
              },
            ],
            element: <>worlds</>,
            path: '/worlds',
          },
        ],
        element: <>root</>,
        path: '/',
      }
    ]);
  });

  it('handles a named route with >1 child', () => {
    expect(getRoutes({
      '/': {
        element: <>root</>,
        children: {
          '/worlds': {
            element: <>worlds</>
          },
          '/launch': {
            element: <>launch</>,
          },
        },
      }
    })).toStrictEqual([
      {
        children: [
          {
            path: '/worlds',
            element: <>worlds</>,
          },
          {
            path: '/launch',
            element: <>launch</>,
          },
        ],
        element: <>root</>,
        path: '/',
      }
    ]);
  });

  it('handles a named route with >1 child that has its own children', () => {
    expect(getRoutes({
      '/': {
        element: <>root</>,
        children: {
          '/worlds': {
            element: <>worlds</>,
            children: {
              ':world': {
                element: <>world detail</>,
              }
            }
          },
          '/launch': {
            element: <>launch</>,
            children: {
              '/new': {
                element: <>new</>,
              }
            }
          },
        },
      }
    })).toStrictEqual([
      {
        children: [
          {
            path: '/worlds',
            element: <>worlds</>,
            children: [
              {
                path: ':world',
                element: <>world detail</>,
              }
            ],
          },
          {
            path: '/launch',
            element: <>launch</>,
            children: [
              {
                path: '/new',
                element: <>new</>,
              }
            ],
          },
        ],
        element: <>root</>,
        path: '/',
      }
    ]);
  });
});
