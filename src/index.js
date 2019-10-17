import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import withErrorBoundary from "./HOCs/withErrorBoundary";
import withMaterialUI from "./HOCs/withMaterialUI";
import withStyledComponents from "./HOCs/withStyledComponents";
import withRedux from "./HOCs/withRedux";

import routes from "./routes";

// withErrorBoundary
const Root_withErrorBoundary = withErrorBoundary(routes);

// withMaterialUI
const Root_withMaterialUI = withMaterialUI(Root_withErrorBoundary);

// withStyledComponents
const Root_withStyledComponents = withStyledComponents(Root_withMaterialUI);

// withRedux
const Root_withRedux = withRedux(Root_withStyledComponents);

// final
const Root = Root_withRedux;

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
