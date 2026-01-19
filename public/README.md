# Pasta Public

Esta pasta centraliza todos os arquivos estáticos e documentos enviados pelos usuários através da aplicação.

## Estrutura

```
public/
├── uploads/          # Arquivos PDF enviados pelos usuários
└── README.md         # Este arquivo
```

## Uso

### Upload de Documentos

Os documentos PDF enviados através do modal de transação são armazenados nesta pasta. O componente Angular de upload (`uploader/app-angular`) gerencia o envio desses arquivos.

### Acesso

Esta pasta está na raiz do projeto para facilitar o acesso por diferentes partes da aplicação:

- Backoffice (Next.js)
- Microfrontend Angular (Upload)
- Microfrontend React (Dashboard)
- Outros serviços futuros

## Segurança

⚠️ **Importante**: Esta pasta deve ser configurada com as permissões adequadas em produção:

- Apenas arquivos PDF devem ser aceitos
- Implementar validação de tamanho máximo
- Sanitizar nomes de arquivos
- Implementar varredura de vírus/malware

## Gitignore

Os arquivos enviados pelos usuários não devem ser versionados. Certifique-se de que `public/uploads/` está no `.gitignore`.
