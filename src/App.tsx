import React from "react";
import { AuthProvider } from "./providers/AuthProvider";
import ScrollToTop from "./shared/scrollToTop";
import { BrowserRouter as Router } from "react-router-dom";
import RoutingMap from "./router/routingMap";

function App() {

  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <RoutingMap />
      </AuthProvider>
    </Router>
  );
}

export default App;
