const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const { parsed: localEnv } = require( 'dotenv' ).config();
// const CompressionPlugin = require('compression-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { resolve } = require( 'path' );

const BUILD_ROOT = resolve( __dirname, 'public/build' );
const NODEMODULES = resolve( __dirname, 'node_modules/' );
const APP = resolve( __dirname, 'app/' );
const ASSETS = resolve( __dirname, 'app/assets/' );
const I18N = resolve( __dirname, 'app/i18n/' );
const REDUX = resolve( __dirname, 'app/redux/' );
const STYLES = resolve( __dirname, 'app/styles/' );

module.exports = {
	mode: 'production',
	// devtool: 'nosources-source-map',

	stats: {
		cached: false,
		modules: false,
		chunks: false,
	},

	entry: {
		vendor: 'mapbox-gl',
		index: './app/entries/index.jsx',
		login: './app/entries/login.jsx',
		admin: './app/entries/admin.jsx',
		data: './app/entries/data.jsx',
		map: './app/entries/map.jsx',
		privacypolicy: './app/entries/privacypolicy.jsx',
	},

	output: {
		filename: '[name].bundle.js', // the output bundle
		path: BUILD_ROOT,
		publicPath: '/build/', // necessary for HMR to know where to load the hot update chunks
		chunkFilename: '[name].js',
	},

	resolve: {
		modules: [ NODEMODULES, REDUX, I18N, ASSETS, STYLES ],
		alias: {
			modernizr$: resolve( __dirname, '.modernizrrc' ),
		},
		extensions: [ '.js', '.jsx', '.scss' ],
	},

	module: {
		noParse: /(mapbox-gl)\.js$/,

		rules: [
			{
				test: /\.jsx?$/,
				include: APP,
				use: [
					{ loader: 'babel-loader', options: { cacheDirectory: true } },
					{ loader: 'eslint-loader' },
				],
			},
			{
				test: /\.modernizrrc$/,
				use: [
					{ loader: 'modernizr-loader' },
					{ loader: 'json-loader' },
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				include: ASSETS,
				type: 'asset/resource',
				generator: {
					filename: 'assets/[name].[contenthash:8][ext][query]',
				},
			},
			{
				test: /\.scss$/,
				include: APP,
				use: ExtractTextPlugin.extract( {
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: '[name]_[local]',
								},
								importLoaders: 1,
							},
						},
						{ loader: 'postcss-loader' },
						{ loader: 'sass-loader' },
					],
				} ),
			},
		],
	},

	plugins: [
		new webpack.DefinePlugin( {
			'process.env.NODE_ENV': JSON.stringify( 'production' ),
		} ),
		new webpack.LoaderOptionsPlugin( {
			minimize: true,
			debug: false,
		} ),
		new webpack.optimize.SplitChunksPlugin( {
			name: 'vendor',
			chunks: 'all',
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules/
				}
			}
		} ),
		new ExtractTextPlugin( {
			filename: '[name].css',
			allChunks: true,
		} ),
		new webpack.EnvironmentPlugin( localEnv ),
	]

}
