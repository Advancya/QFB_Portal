import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import RoutingMap from "./router/routingMap";
//import "./index.css";
import reportWebVitals from "./reportWebVitals";
//import "bootstrap";
//import "bootstrap/dist/js/popper.min.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
//import "./styles/stylesEn.css";
import "./styles/font-awesome.min.css";
import { AuthProvider } from "./providers/AuthProvider";
import ScrollToTop from "./shared/scrollToTop";

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "core-js/features/string/repeat";
import "core-js/es/symbol";
import "core-js/es/object";
import "core-js/es/function";
import "core-js/es/promise";
import "core-js/es/parse-int";
import "core-js/es/parse-float";
import "core-js/es/number";
import "core-js/es/math";
import "core-js/es/date";
import "core-js/es/array";
import "core-js/es/regexp";
import "core-js/es/map";
import "core-js/es/set";
import "core-js/es/reflect";

import "core-js/es/string/repeat";
import "core-js/es/string/pad-start";
import "core-js/es/string/pad-end";
import "core-js/es/string/starts-with";

import "whatwg-fetch";

ReactDOM.render(
  <AuthProvider>
    <Router>
      <ScrollToTop />
      <RoutingMap />
    </Router>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
