const webpack = require('webpack')
const htmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: OUTPUT_PATH
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
  plugins: [
    new htmlWebPackPlugin({ template: './src/index.html' })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: OUTPUT_PATH,
    port: 4172
  }
}