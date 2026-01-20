const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
  // Aplicar configuração do single-spa-angular primeiro
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);
  
  // single-spa-angular já configura libraryTarget: 'system' automaticamente
  // Não sobrescrever output.libraryTarget
  
  // Configurar CORS headers no devServer
  if (!singleSpaWebpackConfig.devServer) {
    singleSpaWebpackConfig.devServer = {};
  }
  singleSpaWebpackConfig.devServer.headers = {
    ...singleSpaWebpackConfig.devServer.headers,
    'Access-Control-Allow-Origin': '*',
  };

  return singleSpaWebpackConfig;
};
