import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import './style/index.scss';
import './utils/polyfill';
import './utils/regenerator-runtime';

import App from './pages/App';
import store from './store';

const load = () => render((
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./pages/App', load);
}

load();
