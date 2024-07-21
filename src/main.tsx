import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth0ProviderWithHistory from './components/Auth0ProviderWithHistory';

import './index.css';

import App from './App';

const rootElement = document.getElementById('sliding-puzzle-game-content');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <App />
  );
}
