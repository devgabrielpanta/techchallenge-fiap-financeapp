# 💰 Tech Challenge - Finance App - Microfrontends

<div align="center">
  <p>Projeto acadêmico demonstrando arquitetura de microfrontends com Next.js e Single-SPA</p>
  <p><strong>🏗️ Arquitetura de Microfrontends com iframe Integration</strong></p>
</div>

## 📖 Sobre o Projeto

O **Tech Challenge - Finance App** é um projeto acadêmico desenvolvido como parte do programa de pós-graduação da FIAP, focado em demonstrar práticas modernas de arquitetura de software e desenvolvimento frontend.

### Objetivo

Este projeto tem como objetivo principal demonstrar a implementação de uma **arquitetura de microfrontends**, permitindo que múltiplas equipes desenvolvam e mantenham aplicações independentes que podem coexistir e se comunicar de forma eficiente.

### Aplicação Financeira

O projeto simula um sistema de gestão financeira que inclui:

- **Dashboard Financeiro**: Visualização de saldo, transações e análises
- **Extrato de Transações**: Histórico detalhado de movimentações financeiras
- **Upload de Documentos**: Sistema para envio e visualização de documentos (PDFs) relacionados às transações

### Principais Conceitos Demonstrados

1. **Microfrontends**: Divisão de uma aplicação monolítica em múltiplos frontends independentes
2. **Integração via iframe**: Comunicação entre aplicações usando iframes e postMessage API
3. **Single-SPA**: Orquestração de múltiplos microfrontends usando diferentes frameworks
4. **Multi-framework**: Coexistência de React e Angular no mesmo ecossistema
5. **Monorepo**: Gerenciamento de múltiplos projetos relacionados em um único repositório

### Contexto Acadêmico

Este projeto faz parte do **Tech Challenge da FIAP**, uma atividade prática que visa:

- Aplicar conceitos de arquitetura de software aprendidos em aula
- Demonstrar habilidades de desenvolvimento frontend moderno
- Criar uma base de conhecimento para projetos profissionais futuros
- Explorar padrões arquiteturais utilizados em grandes empresas de tecnologia

## 📊 Visão Geral Técnica

Este projeto demonstra uma arquitetura de microfrontends utilizando:

- **Backoffice**: Next.js 15 (App Router) como aplicação host/shell
- **Uploader**: Microfrontend com Single-SPA orquestrando múltiplos apps
- **Integração**: Comunicação via iframe e postMessage
- **Frameworks**: React e Angular coexistindo no mesmo microfrontend

## 🗂️ Estrutura do Projeto

```
techchallenge-fiap-financeapp/
├── README.md                    # Documentação principal do projeto
├── package.json
├── turbo.json                   # Configuração do Turbo
├── pnpm-workspace.yaml          # Configuração do PNPM Workspaces
│
├── apps/
│   ├── backoffice/              # Aplicação Host/Shell (Next.js)
│   │   ├── src/
│   │   │   ├── app/             # Pages (Next.js App Router)
│   │   │   │   ├── layout.tsx   # Layout principal
│   │   │   │   ├── page.tsx     # Dashboard
│   │   │   │   └── upload/      # Página que integra o microfrontend
│   │   │   ├── components/      # Componentes React
│   │   │   ├── context/         # Context providers
│   │   │   └── lib/             # Utilitários
│   │   ├── public/              # Assets estáticos
│   │   ├── next.config.js       # Configuração Next.js
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── dashboard/               # Microfrontend Dashboard
│   │   ├── app/                 # Pages (Next.js App Router)
│   │   │   ├── components/      # Componentes de gráficos e visualizações
│   │   │   ├── hooks/           # Custom hooks
│   │   │   ├── services/        # Serviços de API
│   │   │   ├── store/           # Redux store
│   │   │   └── providers/       # Context providers
│   │   ├── package.json
│   │   └── next.config.ts       # Configuração Next.js
│   │
│   └── uploader/                # Microfrontend - Sistema de Upload
│       ├── README.md            # Documentação específica do uploader
│       │
│       ├── root/                # Single-SPA Root Config (Orquestrador)
│       │   ├── src/
│       │   │   ├── root-config.js # Root config do Single-SPA
│       │   │   └── index.html   # HTML base
│       │   ├── package.json
│       │   └── webpack.config.js # Webpack + Single-SPA config
│       │
│       ├── app-react/           # Microfrontend 1 - React (Dashboard)
│       │   ├── src/
│       │   │   ├── index.js     # Entry point React
│       │   │   └── App.jsx      # Componente principal
│       │   ├── package.json
│       │   └── webpack.config.js
│       │
│       └── app-angular/         # Microfrontend 2 - Angular (Upload & Viewer)
│           ├── src/
│           │   ├── app/         # Estrutura Angular
│           │   │   ├── app.component.ts
│           │   │   ├── app.component.html
│           │   │   └── app.component.css
│           │   └── main.ts      # Entry point Angular
│           ├── public/          # Armazenamento de arquivos
│           ├── angular.json
│           ├── package.json
│           └── tsconfig.json
│
└── packages/
    └── theme/                   # Pacote compartilhado de tema
        ├── src/
        │   └── theme.css        # Estilos globais compartilhados
        └── package.json
```

## 🏗️ Arquitetura

### Componentes Principais

#### 1. Backoffice (Next.js - Host)

Aplicação principal que funciona como shell/container:

- **Next.js 15** com App Router
- Renderiza a estrutura base (header, sidebar, navegação)
- Integra o microfrontend `uploader` via **iframe**
- Comunicação com o iframe via **postMessage API**

#### 2. Uploader (Microfrontend)

Sistema de upload e visualização de PDFs, orquestrado por **Single-SPA**:

**2.1 Root Config**

- **Single-SPA Root Config**: Define e carrega os microfrontends
- Gerencia o ciclo de vida dos apps
- Roteamento interno entre apps React e Angular

**2.2 App Angular**

- Upload de PDFs
- Visualizador de PDFs integrado
- Validação de arquivos
- Gerenciamento de arquivos enviados
- Preview em tempo real

**2.3 App React**

- Dashboard financeiro
- Gráficos e análises
- Visualização de métricas
- Interface de relatórios

## 🔗 Integração via iframe

### Como Funciona

O backoffice Next.js integra o microfrontend `uploader` usando iframe:

```
┌─────────────────────────────────────┐
│   Backoffice (Next.js)              │
│   ┌─────────────────────────────┐   │
│   │  iframe                     │   │
│   │  ┌───────────────────────┐  │   │
│   │  │  Single-SPA           │  │   │
│   │  │  ┌─────┐  ┌─────────┐ │  │   │
│   │  │  │React│  │ Angular │ │  │   │
│   │  │  └─────┘  └─────────┘ │  │   │
│   │  └───────────────────────┘  │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Comunicação

**Backoffice → Uploader (via URL Query):**

```typescript
<iframe
  src="http://localhost:4200/upload?transaction-id=123"
  className="w-full h-full"
/>
```

**Uploader → Backoffice (via postMessage):**

```javascript
window.parent.postMessage(
  {
    type: "FILE_UPLOADED",
    fileId: "20251253abcde",
    transactionId: "123",
  },
  "http://localhost:3000",
);
```

```typescript
useEffect(() => {
  window.addEventListener("message", (event) => {
    if (event.data.type === "FILE_UPLOADED") {
      handleFileUpload(event.data.fileId);
    }
  });
}, []);
```

## 🚀 Rodando o Projeto

### Pré-requisitos

- Node.js 20.0 ou superior
- PNPM 9.0 ou superior (recomendado)
- Angular CLI (para app-angular): `npm install -g @angular/cli`

### Instalação

1. **Instalar dependências do Backoffice:**

```bash
cd apps/backoffice
pnpm install
```

2. **Instalar dependências do Uploader Root:**

```bash
cd apps/uploader/root
npm install
```

3. **Instalar dependências do App React:**

```bash
cd apps/uploader/app-react
npm install
```

4. **Instalar dependências do App Angular:**

```bash
cd apps/uploader/app-angular
npm install
```

### Executando as Aplicações

**Terminal 1 - Backoffice (Next.js):**

```bash
cd apps/backoffice
pnpm dev
```

**Terminal 2 - Uploader Root (Single-SPA):**

```bash
cd apps/uploader/root
npm start
```

**Terminal 3 - App React (Dashboard):**

```bash
cd apps/uploader/app-react
npm start
```

**Terminal 4 - App Angular (Upload & Viewer):**

```bash
cd apps/uploader/app-angular
npm start
```

## 🐳 Docker

A aplicação pode ser executada usando Docker Compose para facilitar o deploy e desenvolvimento.

### Executando com Docker Compose

```bash
docker-compose up --build

docker-compose up -d --build

docker-compose down
```

**Containers criados:**

- `backoffice` - Aplicação Next.js (porta 3000)
- `uploader-root` - Single-SPA Root (porta 4200)
- **Uploader React**: Serve o bundle React para dashboard financeiro (porta 3001)
- `uploader-angular` - Microfrontend Angular (porta 4201)

### Executando o Storybook

O Storybook está configurado no **backoffice** para documentação e desenvolvimento de componentes isolados.

**Rodar Storybook:**

```bash
cd apps/backoffice
pnpm storybook
```

O Storybook estará disponível em: **http://localhost:6006**

**Build estático do Storybook:**

```bash
cd apps/backoffice
pnpm build-storybook
```

O build será gerado na pasta `apps/backoffice/storybook-static/`.

### Configuração de Portas

| Aplicação                     | Porta | URL                   |
| ----------------------------- | ----- | --------------------- |
| Backoffice (Host)             | 3000  | http://localhost:3000 |
| Uploader Root                 | 4200  | http://localhost:4200 |
| App React (Dashboard)         | 3001  | http://localhost:3001 |
| App Angular (Upload & Viewer) | 4201  | http://localhost:4201 |
| Storybook                     | 6006  | http://localhost:6006 |

## ☁️ Cloud Security / Auth

### Deploy na Vercel

A aplicação principal (**Backoffice**) foi implantada na plataforma **Vercel**, aproveitando a integração nativa com Next.js para facilitar o processo de deploy contínuo e garantir alta disponibilidade.

- **Plataforma**: Vercel
- **Aplicação**: Backoffice (Next.js)
- **Deploy Automático**: Integração com repositório Git para deploy contínuo
- **Escalabilidade**: Infraestrutura gerenciada pela Vercel com CDN global
- **URL de Produção**: [https://bytebank-techchallengefiap.vercel.app](https://bytebank-techchallengefiap.vercel.app)

> **⚠️ Observação Importante:**
>
> O **Backoffice** está disponível em produção na Vercel. Porém, os microfrontends **App React (Dashboard)** e **App Angular (Upload & Viewer)** **não estão disponíveis em produção** e é necessário rodá-los localmente para que a aplicação funcione completamente. Para acessar todas as funcionalidades, execute os microfrontends seguindo as instruções na seção [🚀 Rodando o Projeto](#-rodando-o-projeto).

### Gerenciamento de Credenciais e Secrets

Por questões de segurança e boas práticas, todas as credenciais, chaves de API e variáveis de ambiente sensíveis **não estão armazenadas no repositório do projeto**.

- **Configuração**: Secrets estão configuradas diretamente no painel da Vercel
- **Segurança**: Credenciais protegidas e não versionadas no Git
- **Ambientes**: Suporte a diferentes ambientes (desenvolvimento, staging, produção) com configurações específicas
- **Acesso**: Apenas membros autorizados do time têm acesso às configurações de secrets na Vercel

## 🔧 Tecnologias Utilizadas

### Backoffice

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Storybook** - Documentação de componentes da UI

### Uploader

- **Single-SPA** - Framework orquestrador de microfrontends
- **React** - Microfrontend de dashboard
- **Angular** - Microfrontend de upload e visualização
- **Webpack 5** - Module bundler
- **TypeScript** - Tipagem estática

## 📚 Documentação Adicional

- [README do Uploader](uploader/README.md) - Documentação detalhada do microfrontend
- [Documentação Docker](docs/DOCKER.md) - Guia completo de containerização
- [Documentação Single-SPA](https://single-spa.js.org/) - Framework de orquestração

## 🤝 Estrutura de Comunicação

### Eventos Suportados

**Do Backoffice para Uploader:**

- `INIT_UPLOAD`: Inicializar processo de upload
- `transaction-id`: ID da transação (via URL query)
- `user-id`: ID do usuário autenticado

**Do Uploader para Backoffice:**

- `FILE_UPLOADED`: Arquivo enviado com sucesso
- `FILE_ERROR`: Erro no upload
- `NAVIGATION_REQUEST`: Navegação solicitada pelo microfrontend

## 🎯 Funcionalidades

### Backoffice (Aplicação Principal)

- ✅ **Dashboard**: Visualização de saldo e resumo financeiro
- ✅ **Gestão de Transações**: Criação, edição e visualização de transações
- ✅ **Extrato**: Listagem completa de movimentações com filtros e paginação
- ✅ **Upload de Documentos**: Integração com microfrontend para envio de arquivos

### Microfrontend Uploader

- ✅ **Upload de PDFs**: Interface Angular para envio de documentos
- ✅ **Visualizador de PDFs**: Interface Angular para visualização de documentos
- ✅ **Dashboard Financeiro**: Interface React para gráficos e análises
- ✅ **Comunicação Bidirecional**: Integração com backoffice via postMessage

## 🏆 Objetivos de Aprendizado

Este projeto demonstra:

- ✅ Arquitetura de microfrontends na prática
- ✅ Integração entre diferentes frameworks (React, Angular)
- ✅ Comunicação entre aplicações independentes
- ✅ Padrões de design para sistemas distribuídos
- ✅ Gerenciamento de monorepo com PNPM Workspaces
- ✅ Desenvolvimento de componentes isolados com Storybook

## 📄 Licença

Este projeto é desenvolvido para fins educacionais como parte do programa de pós-graduação da FIAP.

---

**Para mais detalhes sobre o microfrontend Uploader, consulte [uploader/README.md](uploader/README.md)**
