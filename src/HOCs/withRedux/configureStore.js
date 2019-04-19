import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';

const initialState = {};

const middleware = [
  thunk,
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
    rootReducer,
    initialState,
    composedEnhancers
  )

  return store;
};

export default configureStore;