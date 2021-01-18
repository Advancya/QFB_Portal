import React from "react";
import { AuthProvider } from "./providers/AuthProvider";
import ScrollToTop from "./shared/scrollToTop";
import { BrowserRouter as Router } from "react-router-dom";
import RoutingMap from "./router/routingMap";

function App() {

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <RoutingMap />
      </Router>
    </AuthProvider>
  );
}

export default App;
