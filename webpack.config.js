const webpack = require( 'webpack' )
const path = require( 'path' )

const globalConfigs = require ( './config/' )
const server = globalConfigs.server

const PROJECT_ROOT = path.resolve( './' )
const APP_ROOT = path.join( PROJECT_ROOT, 'app' )
const BUILD_ROOT = path.join( PROJECT_ROOT, 'public/build' )
const ENTRY_INDEX = path.join( PROJECT_ROOT, 'app/entries/index.jsx' )
const ENTRY_LOGIN = path.join( PROJECT_ROOT, 'app/entries/login.jsx' )
const ENTRY_ADMIN = path.join( PROJECT_ROOT, 'app/entries/admin.jsx' )

const ASSETS = path.join( PROJECT_ROOT, 'app/assets/' )
const I18N = path.join( PROJECT_ROOT, 'app/i18n/' )
const REDUX = path.join( PROJECT_ROOT, 'app/redux/' )
const STYLES = path.join( PROJECT_ROOT, 'app/styles/' )

const autoprefixer = require( 'autoprefixer' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
const extractStyles = new ExtractTextPlugin( '[name].css' )

const config = {

	server: server,
	devtool: 'source-map',
	entry: { 

		index: ENTRY_INDEX,
		login: ENTRY_LOGIN,
		admin: ENTRY_ADMIN

	},
	resolve: {
		root: [ REDUX, I18N, ASSETS, STYLES ],
		alias: {
			modernizr$:  path.join( PROJECT_ROOT, '.modernizrrc' )
		},
		extensions: [ '', '.js', '.jsx', '.scss' ]
	},
	output: {
		filename: '[name].bundle.js',
		path: BUILD_ROOT,
		publicPath: '/build/',
		chunkFilename: '[name].js'
	},
	module: {
		noParse: /node_modules\/mapbox-gl\/dist\/mapbox-gl.js/,
		loaders: [ 
			{
				test: /\.jsx?$/,
				include: APP_ROOT,
				loaders: [ 'babel?cacheDirectory', 'eslint-loader' ]
			},
			{
				test: /\.modernizrrc$/,
				loader: 'modernizr'
			},
			{ 
				test: /\.(jpe?g|png|gif|svg)$/i,
				include: ASSETS,
				loader: 'url?limit=10000!img?progressive=true' 
			},
			{
				test: /\.scss$/,
				include: APP_ROOT,
				loader: extractStyles.extract( 'style', 'css?modules&importLoaders=1&localIdentName=[name]_[local]!postcss!sass' )
			}
		]
	},
	postcss: [ autoprefixer ],
	plugins: [
		extractStyles,
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin( {

			beautify: false,
			compress: {
				warnings: true,
				screw_ie8: true
			},
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			comments: false,
			sourceMap: true,
			minimize: true

		} ),
		new webpack.DefinePlugin( {

			'process.env': {

				'NODE_ENV': JSON.stringify( 'production' )

			}

		} )
	]
	
}

module.exports = config
