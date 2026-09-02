import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./i18n";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/typography.css";
import "./styles/animations.css";

import "./data/entitlements/testEntitlements";
import { initializeDemoData } from "./data/seeds/initializeDemoData.js";
import App from "./App";
import { DPFAuthProvider } from "./core/index.js";

async function bootstrap() {
  if (import.meta.env.DEV) {
    try {
      await initializeDemoData();
      console.log("DPF demo data initialized.");
    } catch (error) {
      console.error(
        "DPF demo data initialization failed:",
        error
      );
    }
  }
ReactDOM.createRoot(
    document.getElementById("root")
  ).render(
    <React.StrictMode>
      <DPFAuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DPFAuthProvider>
    </React.StrictMode>
  );
}

bootstrap();