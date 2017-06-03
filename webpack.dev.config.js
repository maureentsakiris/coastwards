//https://stackoverflow.com/questions/42286331/how-to-get-react-hot-loader-working-with-webpack-2-and-webpackdevmiddleware

const webpack = require( 'webpack' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
const { resolve } = require( 'path' )


const BUILD_ROOT = resolve( __dirname, 'public/build' )

const NODEMODULES = resolve( __dirname, 'node_modules/' )
const APP = resolve( __dirname, 'app/' )
const ASSETS = resolve( __dirname, 'app/assets/' )
const I18N = resolve( __dirname, 'app/i18n/' )
const REDUX = resolve( __dirname, 'app/redux/' )
const STYLES = resolve( __dirname, 'app/styles/' )

module.exports = {

	devtool: 'cheap-module-eval-source-map',

	performance: {

		hints: "warning"

	},

	context: resolve( __dirname, 'app' ),

	entry: {

		index: [

			'react-hot-loader/patch',
			'webpack-hot-middleware/client',
			'./entries/index.jsx'

		],
		login: './entries/login.jsx',
		admin: './entries/admin.jsx'

	},

	output: {

		filename: '[name].bundle.js',
		path: BUILD_ROOT,
		publicPath: '/build/',
		chunkFilename: '[name].js'

	},

	resolve: {

		modules: [ NODEMODULES, REDUX, I18N, ASSETS, STYLES ],
		alias: {
			modernizr$:  resolve( __dirname, '.modernizrrc' )
		},
		extensions: [ '.js', '.jsx', '.scss' ]

	},

	module: {

		rules: [

			{

				test: /\.jsx?$/,
				include: APP,
				use: [ 

					{ loader: 'babel-loader', options: { cacheDirectory: true } },
					{ loader: 'eslint-loader' } 

				]

			},
			{

				test: /\.modernizrrc$/,
				use: [ 

					{ loader: 'modernizr-loader' },
					{ loader: 'json-loader' } 

				]

			},
			{ 

				test: /\.(jpe?g|png|gif|svg)$/i,
				include: ASSETS,
				use: [ 

					{ loader: 'url-loader', options: { limit: 10000 } },
					{ loader: 'img-loader', options: { progressive: true } }
					
				]

			},
			{

				test: /\.scss$/,
				include: APP,
				use: ExtractTextPlugin.extract( { 

					fallback: "style-loader",
					use: [

						{ loader: 'css-loader', options: { modules: true, importLoaders: 1, localIdentName: '[name]_[local]' } },
						{ loader: 'postcss-loader' },
						{ loader: 'sass-loader' }

					]

				} )

			}

		]
	},

	plugins: [

		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates

		new webpack.LoaderOptionsPlugin( {

			minimize: true,
			debug: false

		} ),

		new ExtractTextPlugin( {

			filename: "[name].css",
			allChunks: true 

		} )

	]

}