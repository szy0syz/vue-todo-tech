const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig) // 生成bundler
const mfs = new MemoryFS() // 把所有文件读写放在内存中去做
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err // 在打包过程中出现错误就抛出
  stats = stats.toJson() // 如果不是webpack打包错误，即有些eslint错误是不会有err的，所以我们要在stats上判断
  stats.errors.forEach(err => { console.err(err) })
  stats.warnings.forEach(warn => console.err(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated.')
})

const handleSSR = async (ctx) => {
  if(!bundle) {
    ctx.body = '你等一会，别着急......'
    return
  }

  const clientManifestResp = await axios.get('http://127.0.0.1:8000/vue-ssr-client-manifest.json')

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

  

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false, // 不适用vue官方SSR注入模式，自己处理如何插入内容
    clientManifest // 自动生成带有script标签的js文件引用的字符串
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
