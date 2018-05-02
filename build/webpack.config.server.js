const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')


let config

config = merge(baseConfig, {
  // 覆盖base中的entry
  target: 'node', // 指明运行环境
  entry: path.join(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          // fallback: 'style-loader',
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            'stylus-loader'
          ]
        })
      }
      // 修改stylus-loader，因为它有dom操作，而node环境是没法进行dom操作
      // {
      //   test: /\.styl/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         sourceMap: true,
      //       }
      //     },
      //     'stylus-loader'
      //   ]
      // }
    ]
  },
  plugins: [
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.evn.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.evn.VUE_ENV': '"server"', // 官方建议定义
    }),
    new VueServerPlugin({
      // filename: '' // 指定打包输出文件名
    })
  ]
})

module.exports = config
