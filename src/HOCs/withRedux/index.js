import React from "react";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
const store = configureStore();

function withRedux(Component) {
  return (props) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  }
}

export default withRedux;