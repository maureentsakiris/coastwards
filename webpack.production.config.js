const webpack = require( 'webpack' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );


const PROJECT_ROOT = path.resolve( './' );
const BUILD_ROOT = path.join( PROJECT_ROOT, 'public/build' );
const ENTRY_ROOT = path.join( PROJECT_ROOT, 'app/index.jsx' );

const APP_ROOT = path.join( PROJECT_ROOT, 'app' );
const ASSETS_ROOT = path.join( PROJECT_ROOT, 'public/assets' );
const TOOLBOX_ROOT = path.join( PROJECT_ROOT, 'node_modules/react-toolbox' );


const extractStyles = new ExtractTextPlugin( 'styles.css', { allChunks: true } );


const config = {

	devtool: 'cheap-module-source-map',
	entry: [
		ENTRY_ROOT
	],
	node: {
		fs: "empty"
	},
	resolve: {
		extensions: [ '', '.js', '.jsx', '.scss' ],
		alias: {
			modernizr$: path.join( PROJECT_ROOT, './.modernizrrc' )
		}
	},
	output: {
		filename: 'bundle.js',
		path: BUILD_ROOT,
		publicPath: '/build/',
		chunkFilename: '[name].js'
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
				loader: extractStyles.extract( 'style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox' )
			},
			{ 
				test: /\.(jpe?g|png|gif|svg)$/i,
				include: APP_ROOT,
				loader: 'url?limit=10000!img?progressive=true' 
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
				include: ASSETS_ROOT,
				loader: 'url?limit=10000!img?progressive=true' 
			},
			{
				test: /\.modernizrrc$/,
				loader: 'modernizr'
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

// config.addVendor( 'leaflet', path.join( PROJECT_ROOT, './app/utils/Leaflet/leaflet.js' ) );
// config.addVendor( 'mdl', path.join( PROJECT_ROOT, './app/utils/MDL/material.min.js' ) );

module.exports = config;

