# 🏗️ Arquitetura de Microfrontends

Este documento descreve a arquitetura de microfrontends implementada no projeto e como adicionar novos microfrontends.

## 📊 Visão Geral

O projeto foi migrado de um monolito para uma **arquitetura de monorepo com suporte a microfrontends**, utilizando:

- **Monorepo:** Turborepo + PNPM Workspaces
- **Module Federation:** Webpack 5 Module Federation (preparado para uso futuro)
- **Build Tool:** Webpack 5
- **Package Manager:** PNPM

## 🗂️ Estrutura do Projeto

```
techchallenge-fiap-financeapp/
├── apps/
│   └── main/                           # Aplicação principal (HOST)
│       ├── src/                        # Todo código da aplicação
│       │   ├── app/                    # Pages (Next.js App Router)
│       │   ├── components/             # Componentes React
│       │   ├── context/                # Context providers
│       │   ├── lib/                    # Bibliotecas e utils
│       │   ├── schemas/                # Schemas Zod
│       │   └── utils/                  # Utilidades
│       ├── public/                     # Assets estáticos
│       ├── next.config.js              # Config do Next.js + Module Federation
│       ├── package.json                # Dependências do app principal
│       └── tsconfig.json               # TypeScript config
│
├── docs/
│   └── MICROFRONTENDS.md              # Este arquivo
│
├── package.json                        # Root workspace
├── pnpm-workspace.yaml                # PNPM workspaces config
├── turbo.json                          # Turborepo config
└── README.md                           # README principal
```

## 🚀 Rodando o Projeto

### Instalar Dependências

```bash
pnpm install
```

### Rodar Aplicação Principal (Dev)

```bash
# Rodar todos os apps
pnpm dev

# Ou apenas o app principal
cd apps/main
pnpm dev
```

A aplicação estará disponível em: http://localhost:3000

### Rodar Storybook

```bash
# Da raiz do projeto
cd packages/ui
pnpm storybook
```

O Storybook estará disponível em: http://localhost:6006

### Build de Produção

```bash
# Build de tudo
pnpm build

# Build apenas do app principal
cd apps/main
pnpm build
```

## ➕ Como Adicionar um Novo Microfrontend

### 1. Criar o Projeto do Microfrontend

```bash
cd apps/
npx create-next-app@latest novo-microfrontend --typescript --tailwind --app --no-src-dir

cd novo-microfrontend
```

### 2. Configurar como Remote (Module Federation)

Instalar dependências necessárias:

```bash
pnpm add @module-federation/nextjs-mf
pnpm add -D webpack
```

Criar/editar `apps/novo-microfrontend/next.config.js`:

```javascript
const NextFederationPlugin = require('@module-federation/nextjs-mf');

// Required for Module Federation with local webpack
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = '5';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;

    config.plugins.push(
      new NextFederationPlugin({
        name: 'novoMicrofrontend',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Component': './components/MeuComponente',
          './Page': './app/page',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
```

Atualizar `apps/novo-microfrontend/package.json`:

```json
{
  "name": "@finance-app/novo-microfrontend",
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001"
  }
}
```

### 3. Registrar no Host (apps/main)

Editar `apps/main/next.config.js`:

```javascript
const NextFederationPlugin = require('@module-federation/nextjs-mf');

process.env.NEXT_PRIVATE_LOCAL_WEBPACK = '5';

const nextConfig = {
  devIndicators: false,
  
  webpack(config, options) {
    const { isServer } = options;

    config.plugins.push(
      new NextFederationPlugin({
        name: 'main',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          novoMicrofrontend: `novoMicrofrontend@http://localhost:3001/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
```

### 4. Usar o Microfrontend no Código

Em qualquer página/componente de `apps/main`:

```typescript
import dynamic from 'next/dynamic';

const ComponenteRemoto = dynamic(
  () => import('novoMicrofrontend/Component'),
  {
    ssr: false,
    loading: () => <p>Carregando microfrontend...</p>,
  }
);

export default function MinhaPage() {
  return (
    <div>
      <h1>Minha Página</h1>
      <ComponenteRemoto />
    </div>
  );
}
```

### 5. Rodar em Paralelo

**Terminal 1 - App Principal:**
```bash
cd apps/main
pnpm dev
```

**Terminal 2 - Novo Microfrontend:**
```bash
cd apps/novo-microfrontend
pnpm dev
```

**Ou usar Turborepo:**

Adicionar no `turbo.json` e rodar:
```bash
pnpm dev
```

## 🔧 Configuração de Portas

| Aplicação | Porta | URL |
|-----------|-------|-----|
| Main (Host) | 3000 | http://localhost:3000 |
| Microfrontend 1 | 3001 | http://localhost:3001 |
| Microfrontend 2 | 3002 | http://localhost:3002 |
| Storybook | 6006 | http://localhost:6006 |

## ⚠️ Notas Importantes

### Compatibilidade com Next.js 15

Atualmente, `@module-federation/nextjs-mf` tem **problemas de compatibilidade com Next.js 15.5**. As opções são:

1. **Aguardar atualização do plugin** (recomendado para produção)
2. **Usar versões anteriores do Next.js** (14.x)
3. **Usar Module Federation Enhanced** (`@module-federation/enhanced`)

### SSR (Server-Side Rendering)

Module Federation funciona melhor com **Client-Side Rendering (CSR)**. Sempre use `ssr: false` no `dynamic()`:

```typescript
const Remote = dynamic(() => import('remote/Component'), {
  ssr: false, // IMPORTANTE!
});
```

### Shared Dependencies

Certifique-se de que React e React-DOM tenham a **mesma versão** em todos os microfrontends:

```json
{
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0"
  }
}
```

### TypeScript

Para TypeScript reconhecer imports de remotes, crie um arquivo de declaração:

```typescript
// apps/main/src/types/remotes.d.ts
declare module 'novoMicrofrontend/Component' {
  const Component: React.ComponentType;
  export default Component;
}
```

## 🚢 Deploy

### Vercel (Deploy Único)

O monorepo pode ser deployado como um único projeto na Vercel:

1. Configurar root path: `/`
2. Build command: `cd apps/main && pnpm build`
3. Output directory: `apps/main/.next`

### Deploys Independentes

Para deploys separados, cada microfrontend precisa:

1. Seu próprio repositório ou branch
2. Configuração de CI/CD individual
3. URLs de produção configuradas no host

**Exemplo de produção:**

```javascript
remotes: {
  payments: `payments@https://payments.suaapp.com/_next/static/chunks/remoteEntry.js`,
}
```

## 📚 Recursos

- [Module Federation Docs](https://webpack.js.org/concepts/module-federation/)
- [Next.js Module Federation](https://github.com/module-federation/nextjs-mf)
- [Turborepo Docs](https://turbo.build/repo/docs)
- [PNPM Workspaces](https://pnpm.io/workspaces)

## 🆘 Troubleshooting

### Erro: "Cannot find module"

- Verifique se o remote está rodando
- Confirme a URL e porta no `remotes` config
- Verifique se o `name` e `exposes` estão corretos

### Erro de Versão do React

- Garanta que todos os microfrontends usam a mesma versão
- Use `singleton: true` na config de shared dependencies

### Build Falha

- Verifique se webpack está instalado: `pnpm add -D webpack`
- Confirme `NEXT_PRIVATE_LOCAL_WEBPACK='5'` está definido

---

**Para dúvidas ou problemas, consulte a documentação oficial ou abra uma issue no repositório.**
