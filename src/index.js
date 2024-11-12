import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { LandingPage } from './components/LandingPage/LandingPage';
import { componentRegistry } from './componentRegistry';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          {componentRegistry.map(({ ComponentUrl, Component }) => (
            <Route key={ComponentUrl} path={`/${ComponentUrl}`} element={<Component />} />
          ))}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </HashRouter>
    </Provider>

  </React.StrictMode>
);

