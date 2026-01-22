# 🐳 Docker e Containerização

Este documento descreve como containerizar e executar a aplicação usando Docker e Docker Compose.

## 📋 Visão Geral

A aplicação é containerizada em **4 containers independentes**:

1. **finance-app-backoffice** - Aplicação Next.js principal (porta 3000)
2. **finance-app-dashboard** - Dashboard Next.js (porta 3001)
3. **finance-app-uploader-root** - Single-SPA Root Config (porta 4200)
4. **finance-app-uploader-angular** - Microfrontend Angular (porta 4201)

## 🏗️ Estrutura de Containers

```
┌──────────────────────────────────────────────┐
│     Docker Network (finance-app-network)     │
│                                              │
│  ┌────────────┐    ┌──────────────┐          │
│  │ Backoffice │────│  Dashboard   │          │
│  │   :3000    │    │    :3001     │          │
│  └─────┬──────┘    └──────────────┘          │
│        │                                     │
│        │         ┌──────────────┐            │
│        └─────────│Uploader Root │            │
│                  │    :4200     │            │
│                  └──────┬───────┘            │
│                         │                    │
│                  ┌──────┴───────┐            │
│                  │  App Angular │            │
│                  │    :4201     │            │
│                  └──────────────┘            │
└──────────────────────────────────────────────┘
```

## 🚀 Executando com Docker Compose

### Pré-requisitos

- Docker 20.10 ou superior
- Docker Compose 2.0 ou superior

### Comandos Básicos

**Construir e iniciar todos os containers:**

```bash
docker-compose up --build
```

**Executar em background:**

```bash
docker-compose up -d --build
```

**Parar todos os containers:**

```bash
docker-compose down
```

**Ver logs:**

```bash
docker-compose logs -f

# Logs de containers específicos
docker-compose logs -f backoffice
docker-compose logs -f dashboard
docker-compose logs -f uploader-root
docker-compose logs -f uploader-angular
```

**Reconstruir um container específico:**

```bash
docker-compose up --build backoffice
```

## 📦 Containers

### Backoffice (Next.js)

- **Nome:** `finance-app-backoffice`
- **Porta:** 3000
- **Build:** Multi-stage (deps → builder → runner)
- **Output:** Standalone (otimizado para produção)
- **Comando:** `node apps/backoffice/server.js`
- **Função:** Aplicação host/shell que integra os microfrontends

### Dashboard (Next.js)

- **Nome:** `finance-app-dashboard`
- **Porta:** 3001
- **Build:** Multi-stage (deps → builder → runner)
- **Output:** Standalone (otimizado para produção)
- **Comando:** `node apps/dashboard/server.js`
- **Função:** Dashboard financeiro com gráficos e métricas

### Uploader Root (Single-SPA)

- **Nome:** `finance-app-uploader-root`
- **Porta:** 4200
- **Servidor:** Webpack Dev Server
- **Função:** Orquestra o microfrontend Angular

### Uploader Angular

- **Nome:** `finance-app-uploader-angular`
- **Porta:** 4201
- **Servidor:** Angular CLI Dev Server
- **Função:** Microfrontend para upload de PDFs

## 🔧 Configuração

### Variáveis de Ambiente

Os containers podem ser configurados via variáveis de ambiente no `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - PORT=3000
```

### Network

Todos os containers compartilham a mesma network (`finance-app-network`), permitindo comunicação entre eles usando os nomes dos serviços:

- `backoffice` (finance-app-backoffice)
- `dashboard` (finance-app-dashboard)
- `uploader-root` (finance-app-uploader-root)
- `uploader-angular` (finance-app-uploader-angular)

## 🐛 Troubleshooting

### Container não inicia

```bash
docker-compose logs [service-name]

docker-compose ps

docker-compose restart [service-name]
```

### Porta já em uso

Se alguma porta estiver em uso, modifique o mapeamento no `docker-compose.yml`:

```yaml
ports:
  - "3000:3000"
```

### Reconstruir tudo do zero

```bash
docker-compose down -v  # Remove volumes também
docker-compose build --no-cache
docker-compose up
```

## 📝 Notas Importantes

1. **Desenvolvimento vs Produção:**
   - O `docker-compose.yml` atual está configurado para desenvolvimento
   - Para produção, considere usar builds otimizados e variáveis de ambiente adequadas

2. **Hot Reload:**
   - Os microfrontends não têm hot reload habilitado nos containers
   - Para desenvolvimento com hot reload, recomenda-se rodar localmente

3. **Performance:**
   - Os builds do Next.js (backoffice e dashboard) usam modo `standalone` para otimizar o tamanho da imagem
   - O uploader-root e uploader-angular rodam em modo desenvolvimento para facilitar debugging

## 🔗 URLs dos Serviços

Após subir os containers, os serviços estarão disponíveis em:

- **Backoffice:** http://localhost:3000 (Aplicação principal)
- **Dashboard:** http://localhost:3001 (Dashboard financeiro)
- **Uploader Root:** http://localhost:4200 (Single-SPA)
- **Uploader Angular:** http://localhost:4201 (Upload de PDFs)
