const path = require('path')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const html = require('./html.config.js')

const PROJECT_PATH = path.resolve(__dirname, '../build')
const ASSET_PATH = process.env.ASSET_PATH || '/'

module.exports = merge(html, {
  entry: {
    top: './src/js/top.js',
    case: './src/js/case.js',
  },
  output: {
    path: PROJECT_PATH,
    publicPath: ASSET_PATH,
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: ['html-loader', 'ejs-html-loader'],
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
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
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new MiniCssExtractPlugin({
      filename: 'css/common.css',
    }),
  ],
})
