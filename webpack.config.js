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

	context: resolve( __dirname, 'app' ),

	//stats: "normal",

	entry: {

		//vendor: [ 'mapbox-gl' ],
		index: './entries/index.jsx'/*,
		login: './entries/login.jsx',
		admin: './entries/admin.jsx'*/

	},

	output: {

		filename: '[name].bundle.js', // the output bundle
		path: BUILD_ROOT,
		publicPath: '/build/', // necessary for HMR to know where to load the hot update chunks
		chunkFilename: '[name].js'

	},

	resolve: {

		modules: [ NODEMODULES, REDUX, I18N, ASSETS, STYLES ],
		alias: {
			modernizr$:  resolve( __dirname, '.modernizrrc' )
		},
		extensions: [ '.js', '.jsx', '.scss' ]

	},

	devtool: 'nosources-source-map',

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

		new webpack.DefinePlugin( {

			'process.env.NODE_ENV': JSON.stringify( 'production' )

		} ),
		new webpack.LoaderOptionsPlugin( {

			minimize: true,
			debug: false

		} ),
		/*new webpack.optimize.CommonsChunkPlugin( {

			name: 'commons',
			filename: 'commons.bundle.js'

		} ),*/
		//new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin( {

			filename: "[name].css",
			allChunks: true 

		} )
		
	]

}
