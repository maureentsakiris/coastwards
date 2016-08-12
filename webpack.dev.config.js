const webpack = require( 'webpack' )
const path = require( 'path' )

const globalConfigs = require ( './config/' )
const server = globalConfigs.server

const PROJECT_ROOT = path.resolve( './' )
const APP_ROOT = path.join( PROJECT_ROOT, 'app' )
const BUILD_ROOT = path.join( PROJECT_ROOT, 'public/build' )
const ENTRY_INDEX = path.join( PROJECT_ROOT, 'app/entries/index.jsx' )
const ENTRY_TRANSLATE = path.join( PROJECT_ROOT, 'app/entries/translate.jsx' )

const config = {

	server: server,
	devtool: 'source-map',
	entry: { 

		index: [
			'webpack-dev-server/client?http://' + server.ip + ':' + server.port,
			'webpack/hot/only-dev-server',
			ENTRY_INDEX
		],
		translate: ENTRY_TRANSLATE
	},
	resolve: {
		root: path.join( PROJECT_ROOT, 'app/redux/' ),
		alias: {
			modernizr$:  path.join( PROJECT_ROOT, '.modernizrrc' )
		},
		extensions: [ '', '.js', '.jsx' ]
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
				loaders: [ 'react-hot', 'babel?cacheDirectory', 'eslint-loader' ]
			},
			{
				test: /\.modernizrrc$/,
				loader: 'modernizr'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.DedupePlugin()
	]
	
}

module.exports = config