import React, { memo } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import { lazyLoadRoute } from "./CustomLazyLoad";

// history
import history from "./libs/history";

// pages
// NOTE: path MUST be relative to lazyLoadRoute file
const App = lazyLoadRoute(() => import("./pages/App.js"));
const About = lazyLoadRoute(() => import("./pages/About.js"));
const Topics = lazyLoadRoute(() => import("./pages/Topics.js"));

function Routes() {
  return (
    <ConnectedRouter history={history}>
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
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
        <Route exact path="/" component={App} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </ConnectedRouter>
  );
}

export default memo(Routes);
