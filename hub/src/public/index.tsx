import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import "./app.scss";

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
