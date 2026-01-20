FROM node:20-alpine

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar arquivos de dependências da raiz
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY uploader/root/package.json ./uploader/root/

# Instalar dependências do workspace
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY uploader/root/ ./uploader/root/

WORKDIR /app/uploader/root

EXPOSE 4200

CMD ["pnpm", "start"]
