const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'top.html',
      chunks: ['top'],
      template: 'src/ejs/views/top/index.ejs'
    }),
    new HtmlWebpackPlugin({
      filename: 'case.html',
      chunks: ['case'],
      template: 'src/ejs/views/case/index.ejs'
    }),
  ]
}
