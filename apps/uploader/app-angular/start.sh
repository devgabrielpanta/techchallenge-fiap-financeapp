#!/bin/sh

# Script para garantir que dependências opcionais do Rollup sejam instaladas
# antes de iniciar o Angular CLI

ARCH=$(uname -m)
ROLLUP_PKG=""

if [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
  ROLLUP_PKG="@rollup/rollup-linux-arm64-gnu"
else
  ROLLUP_PKG="@rollup/rollup-linux-x64-gnu"
fi

# Verificar se o pacote Rollup já está instalado
if [ ! -d "node_modules/$ROLLUP_PKG" ]; then
  echo "Installing Rollup optional dependency: $ROLLUP_PKG"
  # Tentar instalar o pacote específico
  npm install --save-dev --legacy-peer-deps "$ROLLUP_PKG" 2>&1 || {
    echo "Failed to install $ROLLUP_PKG, trying rollup@latest..."
    npm install --save-dev --legacy-peer-deps rollup@latest 2>&1 || {
      echo "Warning: Could not install Rollup, but continuing anyway..."
    }
  }
fi

# Iniciar o Angular CLI
exec ng serve --port 4201 --host 0.0.0.0 --disable-host-check
