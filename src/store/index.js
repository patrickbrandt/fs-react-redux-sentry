import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
//import thunk from 'redux-thunk';
import thunk from './myThunk';
import recordError from './recordError';
import rootReducer from '../reducers';
import crashReporter from './crashReporter';

const logger = createLogger();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk, logger)
);

export default store;