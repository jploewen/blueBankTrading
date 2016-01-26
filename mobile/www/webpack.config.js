var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './js/src/entry.jsx',
  output: { path: __dirname, filename: '/js/bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
