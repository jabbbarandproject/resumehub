import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import './styles/global.css';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ToastProvider>
          <App />
        </ToastProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Content pages are pre-rendered, so hydrate them. The tool pages read localStorage, so render them fresh.
const clientOnly = /^\/(builder|my-resumes)(\/|$)/.test(window.location.pathname);
if (container.hasChildNodes() && !clientOnly) hydrateRoot(container, app);
else createRoot(container).render(app);
