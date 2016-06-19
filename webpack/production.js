const webpack = require( 'webpack' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );


const PROJECT_ROOT = path.resolve( './' );
const BUILD_ROOT = path.join( PROJECT_ROOT, 'build/production' );
const ENTRY_ROOT = path.join( PROJECT_ROOT, 'app/index.jsx' );

const APP_ROOT = path.join( PROJECT_ROOT, 'app' );
const PUBLIC_ROOT = path.join( PROJECT_ROOT, 'public/assets' );
const PUBLIC_UPLOADS = path.join( PROJECT_ROOT, 'public/uploads' );
const TOOLBOX_ROOT = path.join( PROJECT_ROOT, 'node_modules/react-toolbox' );
const MAPBOX_ROOT = path.join( PROJECT_ROOT, 'node_modules/mapbox-gl' );


const extractStyles = new ExtractTextPlugin( 'styles.css', { allChunks: true } );


const webpackHtmlPlugin = require ( './plugins/webpackHtml' ) ( 'production' ) ;

const config = {

	//devtool: 'cheap-module-source-map',
	entry: {
		app: [ ENTRY_ROOT ]
	},
	node: {
		fs: "empty"
	},
	resolve: {
		extensions: [ '', '.js', '.jsx', '.scss' ],
		alias: {
			modernizr$: path.join( PROJECT_ROOT, './.modernizrrc' ),
	         webworkify: 'webworkify-webpack',
  			'mapbox-gl': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
		}
	},
	output: {
		filename: 'js/[name].js',
		path: BUILD_ROOT,
		publicPath: '/app',
		chunkFilename: 'js/[name].js'
	},
	/*addVendor: function ( name, path ) {

		this.resolve.alias[ name ] = path;
		this.module.noParse.push( new RegExp( path ) );

	},*/
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
				loader: extractStyles.extract( 'style', 'css?sourceMap&modules&importLoaders=1&localIdentName=css/[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox' )
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
			},
			// for mapbox-gl see: https://github.com/mapbox/mapbox-gl-js/issues/1649
			{
				test: /\.json$/,
				include: MAPBOX_ROOT,
				loader: 'json-loader'
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
		new webpack.optimize.UglifyJsPlugin( {
			minimize: false,
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

// config.addVendor( 'leaflet', path.join( PROJECT_ROOT, './app/utils/Leaflet/leaflet.js' ) );
// config.addVendor( 'mdl', path.join( PROJECT_ROOT, './app/utils/MDL/material.min.js' ) );

module.exports = config;

