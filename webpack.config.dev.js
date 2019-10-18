const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

config = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].[hash].css'
		}),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',
				options: {
					plugins: ['syntax-dynamic-import'],
					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			},
			{
				test: /\.scss$/,
				use: [
					// style-loader
					{ loader: 'style-loader'},
					// css-loader
					{
						loader: 'css-loader',
						options: {
							modules: true
						}
					},
					// sass-loader
					{ loader: 'sass-loader' }
				]
			}
		]
	},
	devServer: {
		open: true
	}
};

module.exports = config;