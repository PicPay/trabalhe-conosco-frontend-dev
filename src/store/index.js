/**
 * Dependencies
 */
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { throttle } from 'lodash';
/**
 * Reducers
 */
// import api from './api';
import entities from './entities';
import ui from './ui';

/**
 * Sagas
 */
import rootSaga from '../sagas';

import { loadState, saveState } from './statePersistence';

const STORE_KEY = 'redux';

export const saveReduxStore = state => saveState(state, STORE_KEY);

/**
 * Create combined reducer
 */
const reducers = combineReducers({
  entities,
  ui,
});

/**
 * Create the store with middleware
 */
const sagaMiddleware = createSagaMiddleware();

const persistedState = loadState(STORE_KEY);

const store = createStore(
  reducers,
  persistedState,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

store.subscribe(throttle(() => {
  const { entities, ui } = store.getState();
  saveReduxStore({
    entities,
    ui,
  });
}, 1000));

sagaMiddleware.run(rootSaga);

export default store;
