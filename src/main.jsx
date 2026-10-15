import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const root = document.getElementById("root");
const context = document.getElementById("site-render-context");
const renderedAt = context ? JSON.parse(context.textContent).renderedAt : Date.now();
const app = (
  <StrictMode>
    <App renderedAt={renderedAt} />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
