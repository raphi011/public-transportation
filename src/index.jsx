import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import App from './components/App';
import configureStore from './configureStore';
import { fetchStations } from './actions';
import { saveState, loadState } from './localStorage';

if (navigator.serviceWorker) {
  const registration = runtime.register();
}

const state = loadState();
const store = configureStore(state);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};


fetchStations()(store.dispatch);

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default;
    render(NewApp);
  });
}
