import { supabase } from "./lib/supabase";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./i18n";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/typography.css";
import "./styles/animations.css";

import "./i18n";

import App from "./App";

supabase.auth.getSession().then(({ error }) => {
  if (error) {
    console.error("Supabase connection error:", error);
  } else {
    console.log("Supabase connection OK");
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);