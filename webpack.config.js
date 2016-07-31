const webpack = require( 'webpack' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );

const PROJECT_ROOT = path.resolve( './' );
const BUILD_ROOT = path.join( PROJECT_ROOT, 'public/build' );
const ENTRY_ROOT = path.join( PROJECT_ROOT, 'app/index.jsx' );
const ENTRY_TRANSLATE = path.join( PROJECT_ROOT, 'appTranslate/index.jsx' );


const APP_ROOT = path.join( PROJECT_ROOT, 'app' );
const PUBLIC_ROOT = path.join( PROJECT_ROOT, 'public' );
const TOOLBOX_ROOT = path.join( PROJECT_ROOT, 'node_modules/react-toolbox' );


const extractStyles = new ExtractTextPlugin( 'styles.css', { allChunks: true } );


const config = {

	devtool: 'cheap-module-source-map',
	entry: {
		index: ENTRY_ROOT,
		translate: ENTRY_TRANSLATE
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
				include: [ PUBLIC_ROOT, APP_ROOT ],
				loader: 'url?limit=10000!img?progressive=true' 
			},
			{
				test: /\.modernizrrc$/,
				loader: 'modernizr'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.js$/,
				include: path.resolve( 'node_modules/mapbox-gl-shaders/index.js' ),
				loader: 'transform/cacheable?brfs'
			}
		],
		postLoaders: [ 
			{
				include: /node_modules\/mapbox-gl-shaders/,
				loader: 'transform',
				query: 'brfs'
			}
		]
	},
	toolbox: { 
		theme: './app/_theme.scss' 
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
	
};

module.exports = config;