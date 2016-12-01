const webpack = require( 'webpack' )
const path = require( 'path' )

const globalConfigs = require ( './config/' )
const server = globalConfigs.server

const PROJECT_ROOT = path.resolve( './' )
const APP_ROOT = path.join( PROJECT_ROOT, 'app' )
const BUILD_ROOT = path.join( PROJECT_ROOT, 'public/build' )
const ENTRY_INDEX = path.join( PROJECT_ROOT, 'app/entries/index.jsx' )
const ENTRY_TRANSLATE = path.join( PROJECT_ROOT, 'app/entries/translate.jsx' )

const ASSETS = path.join( PROJECT_ROOT, 'app/assets/' )
const I18N = path.join( PROJECT_ROOT, 'app/i18n/' )
const REDUX = path.join( PROJECT_ROOT, 'app/redux/' )
const STYLES = path.join( PROJECT_ROOT, 'app/styles/' )

const autoprefixer = require( 'autoprefixer' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
const extractStyles = new ExtractTextPlugin( 'styles.css' )

const config = {

	server: server,
	entry: { 

		index: ENTRY_INDEX,
		translate: ENTRY_TRANSLATE
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

			minimize: true,
			compress: {
				warnings: true
			}

		} ),
		new webpack.DefinePlugin( {

			'process.env': {

				'NODE_ENV': JSON.stringify( 'production' )

			}

		} )
	]
	
}

module.exports = config
