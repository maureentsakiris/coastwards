const webpack = require( 'webpack' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );



var SERVER = {};

if( process.argv[ 3 ] == 'office' ){

	SERVER = {
		IP: '134.245.149.30',
		PORT: 3000
	};

}else{

	SERVER = {
		IP: '127.0.0.1',
		PORT: 3000
	};

}


const PROJECT_ROOT = path.resolve( './' );
const BUILD_ROOT = path.join( PROJECT_ROOT, 'public/build' );
const ENTRY_ROOT = path.join( PROJECT_ROOT, 'app/index.jsx' );

const APP_ROOT = path.join( PROJECT_ROOT, 'app' );
/*const STYLES_ROOT = path.join( APP_ROOT, 'styles' );*/
const ASSETS_ROOT = path.join( PROJECT_ROOT, 'public/assets' );


const extractStyles = new ExtractTextPlugin( 'styles.css', { allChunks: true } );

const config = {

	server: SERVER,
	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://' + SERVER.IP + ':' + SERVER.PORT,
		'webpack/hot/only-dev-server',
		ENTRY_ROOT
	],
	resolve: {
		extensions: [ '', '.js', '.jsx', '.scss' ],
		alias: {
			modernizr$:  path.join( PROJECT_ROOT, './.modernizrrc' )
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
	
};

//config.addVendor( 'leaflet', path.join( PROJECT_ROOT, './app/utils/Leaflet/leaflet.js' ) );
//config.addVendor( 'mdl', path.join( PROJECT_ROOT, './app/utils/MDL/material.min.js' ) );

module.exports = config;
