const webpack = require( 'webpack' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );

console.log( "WEBPACK DEVELOPMENT" );

const globalConfigs = require ( './config/' );
const server = globalConfigs.server;

const PROJECT_ROOT = path.resolve( './' );
const BUILD_ROOT = path.join( PROJECT_ROOT, 'public/build' );
const ENTRY_ROOT = path.join( PROJECT_ROOT, 'app/index.jsx' );
const TRANSLATE_ROOT = path.join( PROJECT_ROOT, 'appTranslate/index.jsx' );

const APP_ROOT = path.join( PROJECT_ROOT, 'app' );
const PUBLIC_ROOT = path.join( PROJECT_ROOT, 'public' );
const TOOLBOX_ROOT = path.join( PROJECT_ROOT, 'node_modules/react-toolbox' );

const extractStyles = new ExtractTextPlugin( 'styles.css', { allChunks: true } );

const config = {

	server: server,
	devtool: 'eval',
	entry: { 

		index: [
			'webpack-dev-server/client?http://' + server.ip + ':' + server.port,
			'webpack/hot/only-dev-server',
			ENTRY_ROOT
		],
		translate: TRANSLATE_ROOT
	},
	node: {
		fs: "empty"
	},
	resolve: {
		extensions: [ '', '.js', '.jsx', '.scss' ],
		alias: {
			modernizr$:  path.join( PROJECT_ROOT, './.modernizrrc' ),
			// https://github.com/sleepycat/mapboxgl-webpack-example
			webworkify: 'webworkify-webpack',
			'mapbox-gl': path.resolve( './node_modules/mapbox-gl/dist/mapbox-gl.js' )
		}
	},
	output: {
		filename: '[name].bundle.js',
		path: BUILD_ROOT,
		publicPath: '/build/',
		chunkFilename: '[name].js'
	},
	module: {
		noParse: [],
		loaders: [ 
			{
				test: /\.jsx?$/,
				include: APP_ROOT,
				loaders: [ 'react-hot', 'babel?cacheDirectory', 'eslint-loader' ]
			},
			{
				test: /(\.scss|\.css)$/,
				include: [ TOOLBOX_ROOT, APP_ROOT ],
				loader: extractStyles.extract( 'style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox' )
			},
			{ 
				test: /\.(jpe?g|png|gif|svg)$/i,
				include: PUBLIC_ROOT,
				loader: 'url?limit=10000!img?progressive=true' 
			},
			{
				test: /\.modernizrrc$/,
				loader: 'modernizr'
			},
			// https://github.com/sleepycat/mapboxgl-webpack-example
			{
				test: /\.js$/,
				include: path.resolve( __dirname, 'node_modules/webworkify/index.js' ),
				loader: 'worker'
			},
			{
				test: /mapbox-gl.+\.js$/,
				loader: 'transform/cacheable?brfs'
			}
		]
	},
	toolbox: { 
		theme: './app/_theme.scss' 
	},
	postcss: [ autoprefixer ],
	plugins: [
		extractStyles,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.DedupePlugin()
	]
	
};

module.exports = config;