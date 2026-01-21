import type { NextConfig } from 'next';
import NextFederationPlugin from '@module-federation/nextjs-mf';

// Necessário para Module Federation no Next
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = '5';

const nextConfig: NextConfig = {
  devIndicators: false,

  // 🔴 SEM ISSO, NÃO FUNCIONA (desabilitado temporariamente por falta de suporte ao Module Federation)
  turbopack: {},

  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'dashboard',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Dashboard': './app/DashboardRoot',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
          },
        },
        extraOptions: {
          exposePages: false,
        },
      })
    );

    return config;
  },
};

export default nextConfig;
