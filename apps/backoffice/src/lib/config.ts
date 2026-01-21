/**
 * Configuração de URLs dos serviços
 * Suporta variáveis de ambiente para Docker e desenvolvimento local
 */

export const config = {
  // URLs dos microfrontends
  uploaderRoot: process.env.NEXT_PUBLIC_UPLOADER_ROOT_URL || 'http://localhost:4200',
  uploaderReact: process.env.NEXT_PUBLIC_UPLOADER_REACT_URL || 'http://localhost:3001',
  uploaderAngular: process.env.NEXT_PUBLIC_UPLOADER_ANGULAR_URL || 'http://localhost:4201',
  
  // URL do backoffice (para postMessage)
  backofficeUrl: process.env.NEXT_PUBLIC_BACKOFFICE_URL || 'http://localhost:3000',
} as const;
