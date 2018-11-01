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
    'js/main': './src/js/main.js',
  },
  output: {
    path: PROJECT_PATH,
    publicPath: ASSET_PATH,
    filename: '[name].js'
  },
  module: {
    rules: [
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
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/common.css'
    }),
    new ImageminPlugin({
      externalImages: {
        context: 'src',
        sources: glob.sync('src/images/**/*'),
        destination: 'build/img',
        fileName: '[name].[ext]'
      }
    })
  ]
}
