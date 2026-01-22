import { registerApplication, start } from "single-spa";

// Obter URLs dos microfrontends via variáveis de ambiente ou usar defaults
// No navegador, sempre usar localhost (ou hostname atual) pois os serviços são expostos nas portas do host
const getAngularUrl = () => {
  // Função é executada apenas quando o app é carregado (no browser)
  if (typeof window !== "undefined" && window.location) {
    return `http://${window.location.hostname}:4201/main.js`;
  }
  return "http://localhost:4201/main.js";
};

// Registrar aplicação Angular (Upload e Viewer)
registerApplication({
  name: "angular-app",
  app: () => System.import(getAngularUrl()),
  activeWhen: ["/upload"],
});

// Iniciar Single-SPA
start({
  urlRerouteOnly: true,
});
