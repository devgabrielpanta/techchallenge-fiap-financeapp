# 💰 FIAP Finance App - Tech Challenge

<div align="center">
  <p>Um aplicativo de gerenciamento financeiro desenvolvido como parte do Tech Challenge da FIAP.</p>
  <p><strong>🏗️ Arquitetura de Microfrontends com Monorepo</strong></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://storybook.js.org/)
  [![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build/)
  [![PNPM](https://img.shields.io/badge/PNPM-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

[![Open in Visual Studio Code](https://img.shields.io/badge/Open%20in-Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)](vscode://file/c:/Users/vinic/OneDrive/%C3%81rea%20de%20Trabalho/code-pos-tech/techchallenge-fiap-financeapp:0:0-0:0)
[![Figma](https://img.shields.io/badge/View%20on%20Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/Si8yeUIDtuWi3Xnm2xQgiF/Prot%C3%B3tipo---Tech-Challenge--1?node-id=0-1&p=f)

</div>

## 🏗️ Arquitetura

Este projeto utiliza uma **arquitetura de microfrontends** implementada com:

- **Monorepo:** Turborepo + PNPM Workspaces
- **Module Federation:** Webpack 5 (preparado para uso futuro)
- **Apps:** Aplicações independentes em `apps/`
- **Packages:** Código compartilhado em `packages/`

### Estrutura do Projeto

```
techchallenge-fiap-financeapp/
├── apps/
│   └── main/              # Aplicação principal
├── packages/
│   └── ui/                # Storybook e componentes
├── docs/
│   └── MICROFRONTENDS.md  # Documentação completa
└── ...configs
```

📖 **[Ver documentação completa de microfrontends →](docs/MICROFRONTENDS.md)**

## 🚀 Começando

Siga estas instruções para configurar o projeto localmente para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

- Node.js 20.0 ou superior
- PNPM 9.0 ou superior (recomendado)
- Git

### 🔧 Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/devgabrielpanta/techchallenge-fiap-financeapp.git
   cd techchallenge-fiap-financeapp
   ```

2. **Instale as dependências**

   ```bash
   pnpm install
   ```

   > 💡 Se não tiver PNPM instalado: `npm install -g pnpm`

3. **Inicie o servidor de desenvolvimento**

   ```bash
   # Rodar todos os apps (via Turborepo)
   pnpm dev
   
   # Ou rodar apenas o app principal
   cd apps/main
   pnpm dev
   ```

4. **Acesse a aplicação**
   
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📚 Storybook

O projeto utiliza Storybook para documentação e desenvolvimento de componentes. O Storybook está localizado em `packages/ui/`.

### Executar o Storybook

```bash
# Da raiz do projeto
cd packages/ui
pnpm storybook
```

Acesse [http://localhost:6006](http://localhost:6006) no seu navegador para visualizar o Storybook.

### Gerar build estático do Storybook

```bash
cd packages/ui
pnpm build-storybook
```

O build será gerado na pasta `packages/ui/storybook-static/`.

## 📦 Scripts Disponíveis

### Na raiz do projeto (via Turborepo):

```bash
pnpm dev          # Rodar todos os apps em modo desenvolvimento
pnpm build        # Build de todos os apps
pnpm lint         # Lint em todos os apps
pnpm storybook    # Rodar Storybook
pnpm clean        # Limpar builds e node_modules
```

### No app principal (`apps/main/`):

```bash
pnpm dev          # Rodar em desenvolvimento (porta 3000)
pnpm build        # Build de produção
pnpm start        # Rodar build de produção
pnpm lint         # Executar linter
```

## 🛠 Tecnologias Utilizadas

### Core

- [Next.js 15](https://nextjs.org/) - Framework React com App Router
- [React 19](https://react.dev/) - Biblioteca para interfaces de usuário
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para JavaScript

### Arquitetura

- [Turborepo](https://turbo.build/) - Build system para monorepos
- [PNPM Workspaces](https://pnpm.io/workspaces) - Gerenciamento de pacotes
- [Webpack 5](https://webpack.js.org/) - Module bundler com Module Federation

### UI/Styling

- [Tailwind CSS 4](https://tailwindcss.com/) - Framework CSS utilitário
- [Radix UI](https://www.radix-ui.com/) - Componentes acessíveis headless
- [Lucide Icons](https://lucide.dev/) - Biblioteca de ícones
- [Class Variance Authority](https://cva.style/) - Variantes de componentes

### Desenvolvimento

- [Storybook](https://storybook.js.org/) - Documentação e desenvolvimento de componentes
- [Vitest](https://vitest.dev/) - Framework de testes
- [ESLint](https://eslint.org/) - Linter para JavaScript/TypeScript

## ➕ Adicionando Novos Microfrontends

Este projeto está preparado para receber novos microfrontends. Para adicionar um:

1. Criar novo app em `apps/`
2. Configurar como Remote com Module Federation
3. Registrar no Host (`apps/main`)
4. Importar e usar componentes

📖 **[Ver guia completo de microfrontends →](docs/MICROFRONTENDS.md)**

## 🎨 Design

O design system do projeto foi criado no Figma e pode ser acessado através do link abaixo:

[🔗 Acessar Design no Figma](https://www.figma.com/design/Si8yeUIDtuWi3Xnm2xQgiF/Prot%C3%B3tipo---Tech-Challenge--1?node-id=0-1&p=f)

## 📖 Documentação

- [Arquitetura de Microfrontends](docs/MICROFRONTENDS.md) - Guia completo sobre a estrutura do projeto

## 🤝 Contribuindo

Este é um projeto acadêmico desenvolvido para o Tech Challenge da FIAP. Contribuições são bem-vindas seguindo a estrutura de microfrontends estabelecida.

## 📄 Licença

Este projeto é desenvolvido para fins educacionais como parte do programa de pós-graduação da FIAP.
