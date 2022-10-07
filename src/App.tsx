import React from "react";
import Router from "./components/Router";
import Route from "./components/Route";
import Root from "./pages/root";
import About from "./pages/about";

function App() {
  return (
    <Router>
      <Route path="/" component={<Root />} />
      <Route path="/about" component={<About />} />
    </Router>
  );
}

export default App;
