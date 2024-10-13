import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import "ada-ui";
import "ada-ui/blue";

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
