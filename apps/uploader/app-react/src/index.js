import React from "react";
import * as ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import App from "./App";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: App,
  renderType: "createRoot", // Requerido para React 19
  errorBoundary(err, info, props) {
    // Log error e renderizar fallback
    console.error("React App Error:", err, info, props);
    return React.createElement(
      "div",
      { style: { padding: "20px", color: "red" } },
      `Erro no microfrontend React: ${err.message}`
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
