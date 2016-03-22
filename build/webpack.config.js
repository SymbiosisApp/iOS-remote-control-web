import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const basePath = path.resolve(__dirname, '..')

const webpackConfig = {
  name: 'app',
  target: 'web',
  context: basePath,
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(basePath, '../node_modules')],
    alias: {
      'src': path.resolve(basePath, 'src')
    }
  },
  entry: {
    app: 'src/boot.js'
  },
  output: {
    path: path.resolve(basePath, 'dist'),
    publicPath: '/',
    filename: "bundle.js"
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(basePath, 'src/index.html'),
      hash: false,
      filename: 'index.html',
      chunks: ['app'],
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          plugins: ['add-module-exports'],
          presets: ['es2015', 'stage-0']
        }
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          // inline files smaller then 10kb as base64 dataURL
          limit: 10000,
          // fallback to file-loader with this naming scheme
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  }
}

export default webpackConfig
