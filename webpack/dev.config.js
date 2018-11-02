const merge = require('webpack-merge')
const common = require('./common.config.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'iniline-source-map',
  devServer: {
    contentBase: 'build',
    port: 4003,
    host: '0.0.0.0',
    open: true,
    openPage: 'top.html',
    disableHostCheck: true,
  },
})
