import React, { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';

import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { namedRoutes } from './constants/named-routes';
import { getRoutes } from './utils/get-routes';

const router = createBrowserRouter(getRoutes(namedRoutes));

export const App = () => {
  return (
    <StrictMode>
      <ErrorBoundary displayName="AppErrorBoundary">
        <article
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            justifyContent: 'space-between',
            padding: '6px 15px 0',
            width: '100vw',
          }}
        >
          <div>
            <Header />
            <RouterProvider router={router} />
          </div>
          <Footer />
        </article>
      </ErrorBoundary>
    </StrictMode>
  );
};
