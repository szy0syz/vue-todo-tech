// options中文：https://github.com/vuejs/vue-loader/blob/master/docs/zh-cn/options.md

module.exports = isDev => {
  return {
    preserveWhitespace: false,    // 如果设置为 false，模版中 HTML 标签之间的空格将会被忽略
    extractCSS: !isDev,           // 排除vue文件中css单独提打包到统一css文件，使用vue异步加载是不需要所有样式都去统一css文件加载，这样可以提高首屏加载速度
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    },
    // hotReload: true,          // 根据环境变量生成
    // loaders: {
    //   'docs': docsLoader
    // },
    // preLoader: {
    //   js: 'typescript-loader' // 预处理loader
    // },
    // postLoader: {}
  }
}
