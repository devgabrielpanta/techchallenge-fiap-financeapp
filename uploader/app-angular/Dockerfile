FROM node:20-alpine

# Instalar pnpm e Angular CLI
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN npm install -g @angular/cli@18

WORKDIR /app

# Copiar arquivos de dependências da raiz
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY uploader/app-angular/package.json ./uploader/app-angular/

# Instalar dependências do workspace
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY uploader/app-angular/ ./uploader/app-angular/

WORKDIR /app/uploader/app-angular

EXPOSE 4201

CMD ["pnpm", "start"]
