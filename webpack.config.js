const webpack = require('webpack');
const path = require('path');

var ReactCustomResolver = {
  apply: function(resolver) {
    resolver.plugin('module', function(request, callback) {
      if (request.request[0] === '#') {
        var req = request.request.substr(1);
      console.log('request', request)
      console.log('req', req)
        const filepath = req + '/' + path.basename(req) + '.js';
        var obj = {
          path: request.path,
          request: path.resolve(`./client/${filepath}`),
          query: request.query,
          directory: path.resolve(`./client/${req}`)
        };
        console.log('obj => \n', obj)
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
  entry: path.join(__dirname, 'client/client.js'),
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js',
    publicPath: '/public/js/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  plugins: [
    new webpack.ResolverPlugin([ReactCustomResolver])
  ]
}
