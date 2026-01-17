import { registerApplication, start } from "single-spa";

// Registrar aplicação React (Upload)
registerApplication({
  name: "react-app",
  app: () =>
    System.import(
      "http://localhost:3001/main.js" // URL do app React
    ),
  activeWhen: ["/upload", "/"],
});

// Registrar aplicação Angular (Viewer)
registerApplication({
  name: "angular-app",
  app: () =>
    System.import(
      "http://localhost:4201/main.js" // URL do app Angular
    ),
  activeWhen: ["/viewer"],
});

// Iniciar Single-SPA
start({
  urlRerouteOnly: true,
});
