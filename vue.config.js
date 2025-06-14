const path = require('path');
// require('dotenv').config();

const dotenv = require('dotenv');

// Load env thủ công
dotenv.config({ path: path.resolve(__dirname, '.env') });

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
  devServer: {
    port: parseInt(process.env.VUE_APP_PORT),
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        // pathRewrite: (path) => path.replace(/^\/api/, ''),
      },
      // '/ws/product': {
      //   target: process.env.VUE_APP_WS_URL || 'ws://localhost:8888/ws',
      //   ws: true,
      //   changeOrigin: true,
      // }
    }
  }
};
