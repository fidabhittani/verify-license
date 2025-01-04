import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import "./index.css";
import RootRouter from "./root-router";
import queryClient from "./services/query-client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <RootRouter/>
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
