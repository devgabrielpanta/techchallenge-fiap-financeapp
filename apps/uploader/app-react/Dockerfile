FROM node:20-alpine

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar arquivos de dependências da raiz
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/uploader/app-react/package.json ./apps/uploader/app-react/

# Instalar dependências do workspace
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY apps/uploader/app-react/ ./apps/uploader/app-react/

WORKDIR /app/apps/uploader/app-react

EXPOSE 3001

CMD ["pnpm", "start"]
