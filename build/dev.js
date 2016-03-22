import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from './webpack.config'
import mainServer from '../server/server'

// Edit webpackConfig
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
webpackConfig.entry.app = [hotMiddlewareScript, webpackConfig.entry.app]

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

const server = express()
const port = process.env.PORT || 8000
const compiler = webpack(webpackConfig)

server.set('port', port)

const serverWithSocket = mainServer.socket(server)

server.use(webpackDevMiddleware(compiler, {
  port: port,
  // quiet: true,
  color: true,
  publicPath: webpackConfig.output.publicPath
}))

server.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 5 * 1000
}))

mainServer.static(server)


serverWithSocket.listen(port, () => {
  console.error(`Server is up, visit  http://localhost:${port} !`)
})
