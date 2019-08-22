// postcss.config.js

const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
module.exports = {
    plugins: [postcssImport(), autoprefixer(['IE 10'])]
};