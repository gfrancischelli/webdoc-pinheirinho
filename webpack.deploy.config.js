const webpack = require('webpack');
const path = require('path');

var ReactCustomResolver = {
  apply: function(resolver) {
    resolver.plugin('module', function(request, callback) {
      if (request.request[0] === '#') {
        var req = request.request.substr(1);
        const filepath = req + '/' + path.basename(req) + '.js';
        var obj = {
          path: request.path,
          request: path.resolve(`./client/${filepath}`),
          query: request.query,
          directory: path.resolve(`./client/${req}`)
        };
        this.doResolve(['file'], obj, callback);
      }
      else {
        callback();
      }
    });
  }
};

module.exports = {
  resolve: {
    root: [
      path.resolve('./client'),
      path.resolve('./node_modules'),
    ],
    alias: [
      { components: './client/components' },
      { pages: './client/pages' },
      { utils: './client/utils' },
      { containers: './client/containers' }
    ]
  },
  entry: path.join(__dirname, '/client/client.js'),
  output:{
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js',
    publicPath: '/public/js/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'client'),
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.ResolverPlugin([ReactCustomResolver]),
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
