const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const OUT_DIR = path.resolve(__dirname, 'build');

module.exports = {
  entry: {
    getBlog: path.resolve(SRC_DIR, 'functions/getBlog'),
    listBlogs: path.resolve(SRC_DIR, 'functions/listBlogs'),
    postBlog: path.resolve(SRC_DIR, 'functions/postBlog'),
  },
  output: {
    path: OUT_DIR,
    filename: '[name]/[name].js',
    library: '[name]',
    libraryTarget: 'umd',
  },
  mode: 'development',
  optimization: {
    minimize: false,
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: { node: '14' },
                  modules: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
