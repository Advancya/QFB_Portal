import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import "./styles/stylesEn.css";
import "./styles/font-awesome.min.css";
import HomePage from "./pages/Homepage";

import Landing from "./pages/Landing";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/HomePage" component={HomePage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
