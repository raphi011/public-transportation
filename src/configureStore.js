import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducers';

export default function configureStore(state) {
  const logger = createLogger();

  return createStore(
    reducer,
    state,
    applyMiddleware(thunk, logger),
  );
}
