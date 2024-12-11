import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import RootRouter from "./root-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RootRouter />
    </BrowserRouter>
  </StrictMode>
);
