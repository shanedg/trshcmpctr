import React from 'react';

import { getPaths } from './get-paths';

describe('getPath', () => {
  it('handles a named route with no children', () => {
    expect(getPaths({
      '/': {
        element: <>root</>,
      }
    })).toStrictEqual([
      '/',
    ]);
  });

  it('handles multiple named routes with no children', () => {
    expect(getPaths({
      '/': {
        element: <>root</>,
      },
      '/worlds': {
        element: <>worlds</>,
      },
    })).toStrictEqual([
      '/',
      '/worlds',
    ]);
  });

  it('handles a named route with one non-root child', () => {
    expect(getPaths({
      '/': {
        children: {
          '/worlds': {
            element: <>worlds</>,
          },
        },
        element: <>root</>,
      }
    })).toStrictEqual([
      '/',
      '/worlds',
    ]);
  });

  it('handles a named route with one root child', () => {
    expect(getPaths({
      '/': {
        children: {
          '/': {
            element: <>nested root</>,
          },
        },
        element: <>root</>,
      }
    })).toStrictEqual([
      '/',
    ]);
  });

  it('handles a named route with multiple children', () => {
    expect(getPaths({
      '/': {
        children: {
          '/': {
            element: <>nested root</>,
          },
          '/worlds': {
            element: <>worlds</>,
          },
        },
        element: <>root</>,
      }
    })).toStrictEqual([
      '/',
      '/worlds',
    ]);
  });

  it('handles multiple named route with multiple children', () => {
    expect(getPaths({
      '/': {
        children: {
          '/': {
            element: <>nested root</>,
          },
          '/worlds': {
            element: <>root worlds</>,
          },
        },
        element: <>root</>,
      },
      '/asdf': {
        children: {
          '/': {
            element: <>asdf root</>,
          },
          '/worlds': {
            element: <>asdf worlds</>,
          },
        },
        element: <>asdf</>,
      },
    })).toStrictEqual([
      '/',
      '/worlds',
      '/asdf',
      '/asdf/worlds',
    ]);
  });

  it('handles a named route with a child that has its own children', () => {
    expect(getPaths({
      '/':{
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
        element: <>root</>,
      }
    })).toStrictEqual([
      '/',
      '/worlds',
      '/worlds/:world',
    ]);
  });

  it('handles a named route with a child with a child with a child', () => {
    expect(getPaths({
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
      '/',
      '/worlds',
      '/worlds/:world',
      '/worlds/:world/settings',
    ]);
  });

  it('handles a named route with >1 child', () => {
    expect(getPaths({
      '/': {
        children: {
          '/worlds': {
            element: <>worlds</>
          },
          '/launch': {
            element: <>launch</>,
          },
        },
        element: <>root</>,
      }
    })).toStrictEqual([
      '/',
      '/worlds',
      '/launch',
    ]);
  });

  it('handles a named route with >1 child that has its own children', () => {
    expect(getPaths({
      '/': {
        children: {
          '/worlds': {
            children: {
              ':world': {
                element: <>world detail</>,
              }
            },
            element: <>worlds</>,
          },
          '/launch': {
            children: {
              '/new': {
                element: <>new</>,
              }
            },
            element: <>launch</>,
          },
        },
        element: <>root</>,
      }
    })).toStrictEqual([
      '/',
      '/worlds',
      '/worlds/:world',
      '/launch',
      '/launch/new',
    ]);
  });
});
