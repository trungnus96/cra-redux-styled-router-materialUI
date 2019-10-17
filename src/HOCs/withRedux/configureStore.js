import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from '../../reducers';

// custom middlewares
import customMiddlewares from "./customMiddlewares";

export const history = createBrowserHistory();

const initialState = {};

const middleware = [
  routerMiddleware(history),
  thunk,
  ...customMiddlewares,
];

// enhancers
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

// store
const configureStore = () => {
  const store = createStore(
    createRootReducer(history),
    initialState,
    composedEnhancers
  )

  return store;
};

export default configureStore;