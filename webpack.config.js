const webpack = require('webpack')
const path = require('path')

const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = {
  target: 'electron-renderer',
  mode: 'development',
  entry: path.resolve(__dirname, 'src') + '/index.js',
  output: {
    path: OUTPUT_PATH,
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader'}, { loader: 'css-loader' }],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: OUTPUT_PATH,
    port: 4172
  }
}