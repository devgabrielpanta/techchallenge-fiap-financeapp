# 📤 Uploader Microfrontend

Microfrontend para upload/visualização de documentos (Angular) e dashboard financeiro (React), orquestrado por Single-SPA.

## 🏗️ Arquitetura

Este microfrontend é composto por três aplicações:

1. **Root Config** - Orquestrador Single-SPA que gerencia o ciclo de vida dos apps
2. **App Angular** - Upload e visualização de documentos (PDFs)
3. **App React** - Dashboard financeiro com gráficos e análises

## 📂 Estrutura

```
uploader/
├── root/                    # Single-SPA Root Config
│   ├── src/
│   │   ├── root-config.js   # Configuração do Single-SPA
│   │   └── index.html       # HTML base
│   ├── package.json
│   └── webpack.config.js
│
├── app-react/               # Microfrontend React (Dashboard)
│   ├── src/
│   │   ├── index.js         # Entry point (Single-SPA lifecycle)
│   │   └── App.jsx          # Componente principal
│   ├── package.json
│   └── webpack.config.js
│
└── app-angular/             # Microfrontend Angular (Upload & Viewer)
    ├── src/
    │   ├── app/             # Módulos Angular
    │   │   ├── app.component.ts
    │   │   ├── app.component.html
    │   │   └── app.component.css
    │   └── main.ts          # Entry point (Single-SPA lifecycle)
    ├── public/              # Armazenamento de arquivos
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

## 🚀 Como Executar

### 1. Root Config (Single-SPA)

```bash
cd root
pnpm install
pnpm start
# Rodando em http://localhost:4200
```

### 2. App Angular (Upload & Viewer)

```bash
cd app-angular
pnpm install
pnpm start
# Rodando em http://localhost:4201
```

### 3. App React (Dashboard)

```bash
cd app-react
pnpm install
pnpm start
# Rodando em http://localhost:3001
```

## 🔄 Single-SPA Lifecycle

Cada microfrontend expõe três funções de ciclo de vida:

- **bootstrap**: Executado uma vez quando o app é carregado pela primeira vez
- **mount**: Executado toda vez que a rota ativa corresponde ao app
- **unmount**: Executado toda vez que a rota ativa deixa de corresponder ao app

## 🔗 Integração com Backoffice

O uploader é integrado no backoffice via iframe:

```typescript
// No backoffice (Next.js)
<iframe
  src="http://localhost:4200?transaction-id=123"
  className="w-full h-full"
/>
```

### Comunicação via postMessage

**Uploader → Backoffice:**

```javascript
// Quando um arquivo é enviado
window.parent.postMessage(
  {
    type: "FILE_UPLOADED",
    fileId: "file_123456789",
    transactionId: "123",
    fileName: "documento.pdf",
    fileSize: 1024000,
  },
  "http://localhost:3000",
);
```

**Backoffice → Uploader:**

```javascript
// Backoffice pode enviar comandos
window.postMessage(
  {
    type: "INIT_UPLOAD",
    userId: "user123",
  },
  "http://localhost:4200",
);
```

## 📋 Rotas

O Single-SPA gerencia as rotas internas:

- `/upload` ou `/` → App Angular (Upload & Viewer)
- `/dashboard` → App React (Dashboard)

## 🔧 Configuração

### Root Config (`root/src/root-config.js`)

```javascript
registerApplication({
  name: "angular-app",
  app: () => System.import("http://localhost:4201/main.js"),
  activeWhen: ["/upload", "/"],
});

registerApplication({
  name: "react-app",
  app: () => System.import("http://localhost:3001/main.js"),
  activeWhen: ["/dashboard"],
});
```

### App React (`app-react/src/index.js`)

Usa `single-spa-react` para expor os lifecycles:

```javascript
const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
});
```

### App Angular (`app-angular/src/main.ts`)

Usa `single-spa-angular` para expor os lifecycles:

```javascript
const lifecycles = singleSpaAngular({
  bootstrapFunction: () => platformBrowserDynamic().bootstrapModule(AppModule),
  template: "<app-root />",
});
```

## 📦 Dependências Principais

### Root Config

- `single-spa` - Framework orquestrador
- `webpack` - Module bundler
- `webpack-dev-server` - Dev server

### App Angular

- `@angular/core` - Framework Angular
- `single-spa-angular` - Adapter Single-SPA para Angular
- `@angular-builders/custom-webpack` - Custom webpack config

### App React

- `react` - Framework React
- `react-dom` - React DOM
- `single-spa-react` - Adapter Single-SPA para React

## 🐛 Troubleshooting

### Erro: "Cannot find module"

- Verifique se todos os apps estão rodando nas portas corretas
- Confirme as URLs no `root-config.js`
- Verifique se os headers CORS estão configurados

### App não carrega no iframe

- Verifique a origem no postMessage (deve ser a URL do backoffice)
- Confirme que o root está rodando na porta 4200
- Verifique o console do navegador para erros de CORS

### Roteamento não funciona

- Verifique as rotas no `activeWhen` do `registerApplication`
- Confirme que o `historyApiFallback` está configurado no webpack

## 📚 Recursos

- [Single-SPA Documentation](https://single-spa.js.org/)
- [single-spa-react Documentation](https://single-spa.js.org/docs/ecosystem-react)
- [single-spa-angular Documentation](https://single-spa.js.org/docs/ecosystem-angular)

## 🎯 Próximos Passos

1. ✅ Implementar upload e visualizador de PDF no App Angular
2. Implementar gráficos e análises no Dashboard React
3. Adicionar persistência de arquivos
4. Melhorar tratamento de erros
5. Adicionar testes unitários e de integração
