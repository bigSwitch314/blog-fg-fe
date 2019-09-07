const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const DIST_PATH = path.resolve(__dirname, '../dist')
const PUBLIC_PATH = path.resolve(__dirname, '../public')
const baseWebpackConfig = require('./webpack.base.config.js')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    path: DIST_PATH,
    filename: '[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            // options: { modules: false }, // 开启CSSModules支持
          },
          {
            loader: 'less-loader', // 将Less编译为CSS
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PUBLIC_PATH + '/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(), // 添加 hmr plugin
    new ErrorOverlayPlugin(), // 编译错误页面美化显示
    new StyleLintPlugin({ // css less语法规则检测
      context: 'src',
      configFile: path.resolve(__dirname, '../stylelint.config.js'),
      files: ['**/*.less', '**/*.css'],
      failOnError: false,
      quiet: true,
    }),
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: '8090',
    contentBase: path.join(__dirname, '../public'),
    compress: false,
    historyApiFallback: true,
    hot: true, // 开启 hmr 支持
    https: false,
    noInfo: true,
    open: true,
    proxy: {},
  },
});
