const webpack = require( 'webpack' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );


const PROJECT_ROOT = path.resolve( './' );

const BUILD_TARGET = 'development' ;
const BUILD_ROOT = path.join( PROJECT_ROOT, 'build' , BUILD_TARGET );
const ENTRY_ROOT = path.join( PROJECT_ROOT, 'app/index.jsx' );

const APP_ROOT = path.join( PROJECT_ROOT, 'app' );
const PUBLIC_ROOT = path.join( PROJECT_ROOT, 'public/assets' );
const PUBLIC_UPLOADS = path.join( PROJECT_ROOT, 'public/uploads' );
const TOOLBOX_ROOT = path.join( PROJECT_ROOT, 'node_modules/react-toolbox' );
const MAPBOX_ROOT = path.join( PROJECT_ROOT, 'node_modules/mapbox-gl' );


const extractStyles = new ExtractTextPlugin( 'styles.css', { allChunks: true } );


const webpackHtmlPlugin = require ( './plugins/webpackHtml' ) ( BUILD_TARGET ) ;

const config = {

	devtool: 'sourcemap',
	entry: {
		app: [ ENTRY_ROOT ]
	},
	node: {
		fs: "empty"
	},
	resolve: {
		extensions: [ '', '.js', '.jsx', '.scss' ],
		root: PROJECT_ROOT,
		alias: {
			modernizr$: path.join( PROJECT_ROOT, './.modernizrrc' ),
	          webworkify: 'webworkify-webpack',
  			'mapbox-gl': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')

		}
	},
	output: {
		filename: 'js/[name].js',
		path: BUILD_ROOT,
		publicPath: '/',
		chunkFilename: 'js/[name].js'
	},
	/*addVendor: function ( name, path ) {

		this.resolve.alias[ name ] = path;
		this.module.noParse.push( new RegExp( path ) );

	},*/
	module: {
		noParse: [],
		loaders: [ 
			// for mapbox-gl see: https://github.com/mapbox/mapbox-gl-js/issues/1649
			{
				test: /\.json$/,
				include: MAPBOX_ROOT,
				loader: 'json-loader'
			},
			{
				test: /\.json$/,
				exclude: /node_modules/,
				include: APP_ROOT,
				loader: 'json-loader'
			},
			{
				test: /\.js[x]?$/,
				include: APP_ROOT,
				loaders: [ 'react-hot', 'babel?cacheDirectory', 'eslint-loader' ]
			},
			{
				test: /(\.scss|\.css)$/,
				include: [ TOOLBOX_ROOT, APP_ROOT ],
				loader: extractStyles.extract( 'style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox' )
			},
			{ 
				test: /\.woff(2)?$/,
				include: APP_ROOT,
				loader: 'url?limit=10000!img?progressive=true' 
			},
			{ 
				test: /\.(ttf|otf|eot)$/,
				include: APP_ROOT, 
				loader: 'file'
			},
			{ 
				test: /\.(jpe?g|png|gif|svg)$/i,
				include: PUBLIC_ROOT,
				exclude: PUBLIC_UPLOADS,
				loader: 'file?name=img/[hash].[ext]!img?progressive=true' 
			},
			{
				test: /\.modernizrrc$/,
				loader: 'modernizr'
			}
		],
		postLoaders: [
			{
				include: MAPBOX_ROOT,
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
		webpackHtmlPlugin, 
		new webpack.DefinePlugin( {
			'process.env': {
				'NODE_ENV': JSON.stringify( BUILD_TARGET )
			}
		} )
	]
	
};

// config.addVendor( 'leaflet', path.join( PROJECT_ROOT, './app/utils/Leaflet/leaflet.js' ) );
// config.addVendor( 'mdl', path.join( PROJECT_ROOT, './app/utils/MDL/material.min.js' ) );

module.exports = config;

