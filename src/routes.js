import React, { Fragment, memo } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Link } from "react-router-dom";

import { lazyLoadRoute } from "./CustomLazyLoad";

// history
import { history } from "./HOCs/withRedux/configureStore";

// pages
// NOTE: path MUST be relative to lazyLoadRoute file
const App = lazyLoadRoute("./pages/App.js");
const About = lazyLoadRoute("./pages/About.js");
const Topics = lazyLoadRoute("./pages/Topics.js");

function Routes() {
  return (
    <ConnectedRouter history={history}>
      <Fragment>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </Fragment>
    </ConnectedRouter>
  );
}

export default memo(Routes);
