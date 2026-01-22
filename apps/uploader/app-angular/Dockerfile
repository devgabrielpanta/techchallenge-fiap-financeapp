FROM node:20-alpine

# Instalar pnpm e Angular CLI globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN npm install -g @angular/cli@18

WORKDIR /app

# Copiar arquivos de dependências da raiz (necessário para workspace)
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/uploader/app-angular/package.json ./apps/uploader/app-angular/

# Instalar dependências do workspace
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Copiar código fonte (incluindo start.sh)
COPY apps/uploader/app-angular/ ./apps/uploader/app-angular/

WORKDIR /app/apps/uploader/app-angular

# Converter line endings do Windows (CRLF) para Unix (LF) e tornar executável
RUN sed -i 's/\r$//' start.sh && chmod +x start.sh

EXPOSE 4201

CMD ["sh", "./start.sh"]
