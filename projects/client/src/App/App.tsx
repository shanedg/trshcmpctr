import { StrictMode } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import './App.css';

import { Flex } from '@trshcmpctr/components';

import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { getRoutes } from './get-routes';

const router = createBrowserRouter(getRoutes());

export const App = () => {
  return (
    <StrictMode>
      <ErrorBoundary displayName="AppErrorBoundary">
        <article>
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            style={{
              height: '100vh',
              padding: '6px 15px 0',
              width: '100vw',
            }}
          >
            <Flex
              flexDirection="column"
              style={{
                flexGrow: 1,
              }}
            >
              <Header />
              <RouterProvider router={router} />
            </Flex>
            <Footer />
          </Flex>
        </article>
      </ErrorBoundary>
    </StrictMode>
  );
};
