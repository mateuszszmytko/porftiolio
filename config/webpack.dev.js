const webpackMerge = require('webpack-merge'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	commonConfig = require('./webpack.comm.js'),
	path = require('path');

module.exports = webpackMerge(commonConfig, {
	devtool: 'cheap-module-eval-source-map',

	output: {
		path: path.resolve(__dirname, '..') + '/build',
		publicPath: '/',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},

	plugins: [
		new ExtractTextPlugin('[name].css')
	],

	devServer: {
		historyApiFallback: true,
		stats: 'minimal'
	}
});