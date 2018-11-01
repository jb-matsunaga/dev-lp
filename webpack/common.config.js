const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob')

const PROJECT_PATH = path.resolve(__dirname, '../build')
const ASSET_PATH = process.env.ASSET_PATH || '/'

module.exports = {
  entry: {
    'index': './src/js/index.js',
    'case': './src/js/case.js',
  },
  output: {
    path: PROJECT_PATH,
    publicPath: ASSET_PATH,
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use  : [
          'html-loader',
          'ejs-html-loader'
        ]
      },
      {
        test: /\.s?css$/,
        use: [ 
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: 'img/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: 'src/ejs/views/index/index.ejs'
    }),
    new HtmlWebpackPlugin({
      filename: 'case.html',
      chunks: ['case'],
      template: 'src/ejs/views/case/index.ejs'
    }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new MiniCssExtractPlugin({
      filename: 'css/common.css'
    })
  ]
}
