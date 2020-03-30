import {createStore, compose as origCompose, combineReducers} from 'redux';
import {lazyReducerEnhancer} from 'pwa-helpers';
import {connectRouter, navigate} from "lit-redux-router";

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;
const router = createStore(state => state, compose(lazyReducerEnhancer(combineReducers)));

class _Router {
  constructor() {
    connectRouter(router);
  }

  navigateTo(nav) {
    router.dispatch(navigate(nav));
  }
}

const Router = new _Router();

export default Router;
