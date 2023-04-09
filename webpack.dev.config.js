//https://stackoverflow.com/questions/42286331/how-to-get-react-hot-loader-working-with-webpack-2-and-webpackdevmiddleware

const webpack = require( 'webpack' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { resolve } = require( 'path' )
const { parsed: localEnv = {} } = require( 'dotenv' ).config()


const BUILD_ROOT = resolve( __dirname, 'public/build' )

const NODEMODULES = resolve( __dirname, 'node_modules/' )
const APP = resolve( __dirname, 'app/' )
const ASSETS = resolve( __dirname, 'app/assets/' )
const I18N = resolve( __dirname, 'app/i18n/' )
const REDUX = resolve( __dirname, 'app/redux/' )
const STYLES = resolve( __dirname, 'app/styles/' )

module.exports = {
	mode: 'development',
	devtool: 'eval-cheap-module-source-map',

	performance: {

		hints: "warning"

	},

	entry: {

		vendor: 'mapbox-gl',
		index: [

			'react-hot-loader/patch',
			'webpack-hot-middleware/client',
			'./app/entries/index.jsx'

		],
		login: './app/entries/login.jsx',
		admin: './app/entries/admin.jsx',
		data: './app/entries/data.jsx',
		map: './app/entries/map.jsx',
		privacypolicy: './app/entries/privacypolicy.jsx'

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
		extensions: [ '.js', '.jsx', '.scss' ],
		fallback: {
			url: require.resolve( 'url/' ),
			stream: require.resolve( "stream-browserify" ),
			buffer: require.resolve( 'buffer/' ),
			http: require.resolve( "stream-http" )
		}

	},

	module: {

		noParse: /(mapbox-gl)\.js$/,

		rules: [

			{

				test: /\.jsx?$/,
				include: APP,
				use: [ 

					{ loader: 'babel-loader', options: { cacheDirectory: true } }

				]

			},
			{

				test: /\.modernizrrc$/,
				use: [ {
					loader: 'val-loader',
					options: {
						executableFile: require.resolve( 'val-loader-modernizr' )
					}
				} ]

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
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { modules: true, importLoaders: 1, localIdentName: '[name]_[local]' } },
					{ loader: 'postcss-loader' },
					{ loader: 'sass-loader' }
				]


			}

		]
	},

	plugins: [

		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		// new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates

		new webpack.LoaderOptionsPlugin( {

			minimize: true,
			debug: false

		} ),
		/* new webpack.optimize.CommonsChunkPlugin( {

			names: [ 'vendor', 'manifest' ]

		} ), */
		new MiniCssExtractPlugin( {

			filename: "[name].css",

		} ),
		new webpack.EnvironmentPlugin( localEnv ),
		new webpack.ProvidePlugin( {
			Buffer: [ 'buffer', 'Buffer' ],
		} ),
		new webpack.ProvidePlugin( {
			process: 'process/browser',
		} ),
	]

}