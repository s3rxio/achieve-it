import * as React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Welcome from "./welcome";

const Landing = React.lazy(() => import("landing/Module"));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/landing">Landing</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
