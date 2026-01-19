import { registerApplication, start } from "single-spa";

// Registrar aplicação Angular (Upload e Viewer)
registerApplication({
  name: "angular-app",
  app: () =>
    System.import(
      "http://localhost:4201/main.js", // URL do app Angular
    ),
  activeWhen: ["/upload"],
});

// Registrar aplicação React (Dashboard)
registerApplication({
  name: "react-app",
  app: () =>
    System.import(
      "http://localhost:3001/main.js", // URL do app React
    ),
  activeWhen: ["/dashboard"],
});

// Iniciar Single-SPA
start({
  urlRerouteOnly: true,
});
