FROM node:20

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli@18

WORKDIR /app

# Copiar código fonte do Angular primeiro
COPY apps/uploader/app-angular/ ./apps/uploader/app-angular/

WORKDIR /app/apps/uploader/app-angular

# Usar npm diretamente para o Angular (pnpm tem problemas com dependências opcionais do Rollup)
# Remover node_modules e package-lock.json se existirem (como sugerido no erro)
RUN rm -rf node_modules package-lock.json

# Instalar dependências usando npm
RUN npm install --legacy-peer-deps

# Instalar explicitamente o pacote Rollup necessário baseado na arquitetura
# O Angular CLI precisa dessas dependências opcionais do Rollup
RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then \
      npm install --save-dev --legacy-peer-deps @rollup/rollup-linux-arm64-gnu || \
      (echo "Installing rollup fallback..." && npm install --save-dev --legacy-peer-deps rollup@latest); \
    else \
      npm install --save-dev --legacy-peer-deps @rollup/rollup-linux-x64-gnu || \
      (echo "Installing rollup fallback..." && npm install --save-dev --legacy-peer-deps rollup@latest); \
    fi

# Tornar o script de inicialização executável
RUN chmod +x start.sh

EXPOSE 4201

CMD ["./start.sh"]
