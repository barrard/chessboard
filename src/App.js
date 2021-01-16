import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import React, { useState, useEffect,  Suspense,
 } from "react";
import Todo from "./components/Todo";
import Home from "./components/Home";
import Hooks from "./components/Hooks";
import Sass from "./components/Sass";
import ProviderExample from "./components/ProvierExample";
import Chess from "./components/Chess";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
// const Chess = React.lazy(() => {
//   import("./components/Chess");
// });

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
          <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sass">Sass</Link>
            </li>
            <li>
              <Link to="/provider">Provider</Link>
            </li>
            <li>
              <Link to="/chess">Chess</Link>
            </li>
            <li>
              <Link to="/todo">Todo</Link>
            </li>
            <li>
              <Link to="/hooks">Hooks</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Switch>
            {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Route path="/chess">
              <Chess />
          </Route>
            {/* </Suspense> */}
          <Route path="/provider">
            <Chess />
          </Route>
          <Route path="/hooks">
            <Hooks />
          </Route>
          <Route path="/todo">
            <Todo />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/sass">
            <Sass />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
