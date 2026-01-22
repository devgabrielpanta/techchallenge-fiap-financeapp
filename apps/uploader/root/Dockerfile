FROM node:20-alpine

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app/apps/uploader/root

# Copiar package.json do uploader-root
COPY apps/uploader/root/package.json ./

# Instalar dependências diretamente no diretório do uploader-root
RUN pnpm install --shamefully-hoist

# Copiar código fonte
COPY apps/uploader/root/ ./

EXPOSE 4200

CMD ["pnpm", "start"]
