import { createElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App/App';

import './reset.css';
import './style.css';

const containerId = 'root';
const container = document.getElementById(containerId);

if (!container) {
  throw new Error(`#${containerId} not found`);
}

const root = createRoot(container);
const StrictApp = createElement(StrictMode, {
  children: createElement(App),
});
root.render(StrictApp);
