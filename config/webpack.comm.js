const	webpack = require('webpack'),
		HtmlWebpackPlugin = require('html-webpack-plugin'),
		ExtractTextPlugin = require('extract-text-webpack-plugin'),
		autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		'polyfills': './src/polyfills.ts',
		'app': './src/main.ts'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{ test: /\.ts?$/, use: "awesome-typescript-loader" },
			{ test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
			  loader: 'file-loader?name=assets/[name].[hash:8].[ext]' },
			{ test: /\.css$/, use: ExtractTextPlugin.extract(
                [{loader: 'css-loader', options: {sourceMap: true, importLoaders: 1} },
                 {loader: 'postcss-loader', options: {sourceMap: true, plugins: (loader) => [autoprefixer()]} } ])
            },
            { test: /\.scss$/, use: ExtractTextPlugin.extract(
                [{loader: 'css-loader', options: {sourceMap: true, importLoaders: 1} },
                 {loader: 'postcss-loader', options: {sourceMap: true, plugins: (loader) => [autoprefixer()]} },
                 {loader: 'sass-loader', options: {sourceMap: true, importLoaders: 1} } ])
            },
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'polyfills']
		}),

		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	]
}