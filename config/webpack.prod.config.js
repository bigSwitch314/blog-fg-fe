const path = require('path')
const merge = require('webpack-merge')
const DIST_PATH = path.resolve(__dirname, '../dist')
const PUBLIC_PATH = path.resolve(__dirname, '../public')
const baseWebpackConfig = require('./webpack.base.config.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const InlineSourcePlugin = require('html-webpack-inline-source-plugin')
const BundleAnalyzerPlugin = require('html-webpack-inline-source-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: DIST_PATH,
    filename: '[name].[chunkhash:8].js',
    // publicPath: 'http://bd.bxstatic.com/img/',
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // options: { modules: true }, // 开启CSSModules支持
          },
          {
            loader: 'less-loader', // 将Less编译为CSS
          },
          {
            loader: 'postcss-loader', // 不同浏览器前缀适配
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PUBLIC_PATH + '/index.html',
      inlineSource: 'runtime~.+\\.js', // 需要内联的文件名正则，runtime 的正则是包含 runtime 关键字
      inject: 'body', // 注入body底部
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css
        removeAttributeQuotes: true, // 移除属性的引号
      },
    }),
    new MiniCssExtractPlugin({ // 导出css
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new InlineSourcePlugin(), // 注意顺序，这个插件需要配置在HtmlWebpackPlugin之后
    new BundleAnalyzerPlugin(), // 打包分析
    new CleanWebpackPlugin(), // 清除旧的dist
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({ // 压缩js
        cache: true, // 使用 cache，加快二次构建速度
        parallel: true, // 多线程加速压缩
        terserOptions: {
          comments: false,
          compress: {
            unused: true, // 删除无用的代码
            drop_debugger: true, // 删掉 debugger
            drop_console: true, // 移除 console
            dead_code: true, // 移除无用的代码
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}), // 压缩css
    ],
    concatenateModules: true, // 开启Scope Hoisting，使打包后的代码体积更小、运行更快
    runtimeChunk: true, // 运行分块
    splitChunks: {
      chunks: 'all', // 三选一： "initial" | "all" | "async" (默认)
      minSize: 60000, // 最小尺寸，30K，development 下是10k，越大那么单个文件越大，chunk 数就会变少（针对于提取公共 chunk 的时候，不管再大也不会把动态加载的模块合并到初始化模块中）当这个值很大的时候就不会做公共部分的抽取了
      maxSize: 0, // 文件的最大尺寸，0为不限制，优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize
      minChunks: 1, // 默认1，被提取的一个模块至少需要在几个 chunk 中被引用，这个值越大，抽取出来的文件就越小
      maxAsyncRequests: 5, // 在做一次按需加载的时候最多有多少个异步请求，为 1 的时候就不会抽取公共 chunk 了
      maxInitialRequests: 3, // 针对一个 entry 做初始化模块分隔的时候的最大文件数，优先级高于 cacheGroup，所以为 1 的时候就不会抽取 initial common 了
      automaticNameDelimiter: '~', // 打包文件名分隔符
      name: true, // 拆分出来文件的名字，默认为 true，表示自动生成文件名，如果设置为固定的字符串那么所有的 chunk 都会被合并成一个
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 正则规则，如果符合就提取 chunk
          priority: -10, // 缓存组优先级，当一个模块可能属于多个 chunkGroup，这里是优先级
        },
        default: {
          minChunks: 2,
          priority: -20, // 优先级
          reuseExistingChunk: true, // 如果该chunk包含的modules都已经另一个被分割的chunk中存在，那么直接引用已存在的chunk，不会再重新产生一个
        },
      },
    },
  },
});
