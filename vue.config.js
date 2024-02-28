const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'components': path.resolve(__dirname, 'src/components'),
        'assets': path.resolve(__dirname, 'src/assets'),
        'libs': path.resolve(__dirname, 'src/libs'),
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ],
  }
})
