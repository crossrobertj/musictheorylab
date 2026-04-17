import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import { registerSourceServiceWorker } from "./app/registerServiceWorker";
import "./styles/shell.css";
import "./styles/base.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

void registerSourceServiceWorker();
