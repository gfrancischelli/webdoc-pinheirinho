'use strict'

const webpack = require('webpack');

module.exports = {
    entry: './templates/components',
    output:{
        path: __dirname + '/public/js',
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot/riot'
        })
    ],
    module: {
        preLoaders: [{
            test: /\.tag$/,
            loader: 'riotjs-loader',
            query: { 
                type: 'babel'
            },
        }],
        loaders: [{
            test: /\.js$|\.tag$/,
            loader: 'babel-loader',
            query:  {
                presets: ['es2015'],
            }
        }]
    }
}
