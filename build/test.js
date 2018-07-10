require('./check-versions')()

process.env.NODE_ENV = 'testing'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.test.conf')

var spinner = ora('构建测试...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  测试完成.\n'))
    console.log(chalk.yellow(
      '  提示：测试的目标文件是在 HTTP 服务器上提供服务。\n' +
      '  单独打开 index.html 文件将不会正常工作。\n'
    ))
  })
})
