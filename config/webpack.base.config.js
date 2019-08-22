const path = require('path')
const SRC_PATH = path.resolve(__dirname, '../src')

module.exports = {
  entry: {
    main: SRC_PATH + '/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 缓存
            },
          },
          {
            loader: 'eslint-loader',
            options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
              formatter: require('eslint-formatter-friendly'), // 指定错误报告的格式规范
              failOnError: true, // eslint报错，编译失败
            },
          },
        ],
        include: SRC_PATH,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 3*1024 }, // 大于等于3k图片，进行Base64处理
        },
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        enforce: 'pre', // 这会应用该 loader，在其它之前
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      '@src': SRC_PATH,
      '@pages': path.resolve(SRC_PATH, 'pages'),
      '@utils': path.resolve(SRC_PATH, 'utils'),
      '@components': path.resolve(SRC_PATH, 'components'),
      '@assets': path.resolve(SRC_PATH, 'assets'),
      '@styles': path.resolve(SRC_PATH, 'styles'),
    },
  },
};
