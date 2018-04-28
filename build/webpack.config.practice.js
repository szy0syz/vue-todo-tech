const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const devServer = {
  port: 8080,
  host: '127.0.0.1',
  overlay: {
    errors: true,
  },
  hot: true
}

const defaultPlugins= [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': "'development'"
    }
  }),
  new HTMLPlugin(
    {
      template: path.join(__dirname, 'template.html')
    }
  )
]

let config

config = merge(baseConfig, {
  // 覆盖base中的entry
  entry: path.join(__dirname, '../practice/index.js'),
  // import Vue from 'vue'
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  devServer,
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
