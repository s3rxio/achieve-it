import Router from "./app.routes";
import Providers from "./providers";
import "./styles/base.scss";

export function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}

export default App;
