import React, { Fragment } from "react";
import App from "./App";
import About from "./About";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import dynamicImport from "./DynamicImport";

const Topics = dynamicImport("./Topics");


const routes = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default routes;