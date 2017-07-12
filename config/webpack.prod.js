const webpack = require('webpack'),
	webpackMerge = require('webpack-merge'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	commonConfig = require('./webpack.comm.js'),
	path = require('path');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, '..') + '/build',
    publicPath: '',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[id].[chunkhash:8].chunk.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({ 
      sourceMap: true,
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin('[name].[contenthash:8].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false
      }
    })
  ]
});

