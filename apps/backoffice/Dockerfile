FROM node:20-alpine AS base

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Stage 1: Dependencies
FROM base AS deps
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/backoffice/package.json ./apps/backoffice/

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Stage 2: Build
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/backoffice/node_modules ./apps/backoffice/node_modules
COPY . .

WORKDIR /app/apps/backoffice

# Build da aplicação
RUN pnpm build

# Stage 3: Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos do standalone build
COPY --from=builder --chown=nextjs:nodejs /app/apps/backoffice/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/backoffice/.next/static ./apps/backoffice/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/backoffice/public ./apps/backoffice/public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
