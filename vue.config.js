const path = require('path');

module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Alias mặc định
        'components': path.resolve(__dirname, 'src/components'), // Alias cho components
        'assets': path.resolve(__dirname, 'src/assets'), // Alias cho assets
      },
    },
  },
};
