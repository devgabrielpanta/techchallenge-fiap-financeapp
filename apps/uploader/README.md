# 📤 Uploader Microfrontend

Microfrontend para upload de documentos (PDFs) usando Angular, orquestrado por Single-SPA.

## 🏗️ Arquitetura

Este microfrontend é composto por duas aplicações:

1. **Root Config** - Orquestrador Single-SPA que gerencia o ciclo de vida do app Angular
2. **App Angular** - Upload e validação de documentos (PDFs)

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
└── app-angular/             # Microfrontend Angular (Upload)
    ├── src/
    │   ├── app/             # Componentes Angular
    │   │   ├── app.component.ts
    │   │   ├── app.component.html
    │   │   └── app.component.css
    │   └── main.ts          # Entry point (Single-SPA lifecycle)
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

### 2. App Angular (Upload)

```bash
cd app-angular
npm install
pnpm start
# Rodando em http://localhost:4201
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

- `/upload` → App Angular (Upload)

## 🔧 Configuração

### Root Config (`root/src/root-config.js`)

```javascript
registerApplication({
  name: "angular-app",
  app: () => System.import("http://localhost:4201/main.js"),
  activeWhen: ["/upload", "/"],
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
- [single-spa-angular Documentation](https://single-spa.js.org/docs/ecosystem-angular)
- [Angular Documentation](https://angular.dev/)

## 🎯 Funcionalidades Implementadas

- ✅ Upload de PDFs no App Angular
- ✅ Validação de arquivos (tipo e tamanho)
- ✅ Comunicação com backoffice via postMessage
- ✅ Integração com Single-SPA
- ✅ Gerenciamento de arquivos enviados
