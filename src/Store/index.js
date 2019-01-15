import { createStore, compose, applyMiddleware } from 'redux';
import promiseMiddleWare from  'redux-promise';
import reducers from './../Reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(
    applyMiddleware(promiseMiddleWare)));