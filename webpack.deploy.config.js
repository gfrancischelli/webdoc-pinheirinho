const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/client.js'),
  output:{
    path: path.join(__dirname, '/public/js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'client'),
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015'],
      }
    }]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true,
    }),
  ]
}
