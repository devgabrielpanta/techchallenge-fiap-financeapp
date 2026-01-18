FROM node:20-alpine

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar arquivos de dependências da raiz
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY uploader/app-react/package.json ./uploader/app-react/

# Instalar dependências do workspace
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY uploader/app-react/ ./uploader/app-react/

WORKDIR /app/uploader/app-react

EXPOSE 3001

CMD ["pnpm", "start"]
