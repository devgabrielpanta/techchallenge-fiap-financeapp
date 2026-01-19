# 🐳 Docker e Containerização

Este documento descreve como containerizar e executar a aplicação usando Docker e Docker Compose.

## 📋 Visão Geral

A aplicação é containerizada em **4 containers independentes**:

1. **backoffice** - Aplicação Next.js principal (porta 3000)
2. **uploader-root** - Single-SPA Root Config (porta 4200)
3. **uploader-react** - Microfrontend React (porta 3001)
4. **uploader-angular** - Microfrontend Angular (porta 4201)

## 🏗️ Estrutura de Containers

```
┌────────────────────────────────────────┐
│     Docker Network                     │
│                                        │
│  ┌──────────┐    ┌──────────────┐      │
│  │Backoffice│────│ Uploader Root│      │
│  │  :3000   │    │    :4200     │      │
│  └──────────┘    └──────┬───────┘      │
│                         │              │
│              ┌──────────┴──────────┐   │
│              │                     │   │
│        ┌─────┴─────┐      ┌────────┴┐  │
│        │App React  │      │App Ang. │  │
│        │  :3001    │      │  :4201  │  │
│        └───────────┘      └─────────┘  │
└────────────────────────────────────────┘
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

docker-compose logs -f backoffice
docker-compose logs -f uploader-root
docker-compose logs -f uploader-react
docker-compose logs -f uploader-angular
```

**Reconstruir um container específico:**

```bash
docker-compose up --build backoffice
```

## 📦 Containers

### Backoffice (Next.js)

- **Porta:** 3000
- **Build:** Multi-stage (deps → builder → runner)
- **Output:** Standalone (otimizado para produção)
- **Comando:** `node backoffice/server.js`

### Uploader Root (Single-SPA)

- **Porta:** 4200
- **Servidor:** Webpack Dev Server
- **Função:** Orquestra os microfrontends React e Angular

### Uploader Angular

- **Porta:** 4201
- **Servidor:** Angular CLI Dev Server
- **Função:** Serve o bundle Angular para upload e visualização de PDFs

### Uploader React

- **Porta:** 3001
- **Servidor:** Webpack Dev Server
- **Função:** Serve o bundle React para dashboard financeiro

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

- `backoffice`
- `uploader-root`
- `uploader-react`
- `uploader-angular`

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
   - Os microfrontends (React e Angular) não têm hot reload habilitado nos containers
   - Para desenvolvimento, recomenda-se rodar localmente

3. **Performance:**
   - O build do Next.js usa modo `standalone` para otimizar o tamanho da imagem
   - Os microfrontends rodam em modo desenvolvimento para facilitar debugging

## 🔗 URLs dos Serviços

Após subir os containers, os serviços estarão disponíveis em:

- Backoffice: http://localhost:3000
- Uploader Root: http://localhost:4200
- Uploader Angular (Upload): http://localhost:4201
- Uploader React (Dashboard): http://localhost:3001
