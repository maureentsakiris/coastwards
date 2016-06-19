const webpack = require( 'webpack' );
const path = require( 'path' );

var HtmlWebpackPlugin 	= require('html-webpack-plugin');

const PROJECT_ROOT = path.resolve( './' );
const BUILD_ROOT = path.join( PROJECT_ROOT, 'public/build' );


const extendEntry = function ( entry ) {
	entry.app.push ( 'webpack-dev-server/client?http://127.0.01:8888' );
	entry.app.push ( 'webpack/hot/only-dev-server' );
};


const extendConfig = function ( config ) {
	extendEntry ( config.entry ) ;

	config.debug = true;
	config.ip = '127.0.0.1';
	config.port = 8888;

	if ( !config.plugins )
	{
		config.plugins = [];
	}

	extendPlugins ( config.plugins ) ;
};

const extendPlugins = function ( plugins ) {
	plugins.push ( {
		new webpack.HotModuleReplacementPlugin({
			hot: true
		})
	} ) ;
}

module.exports = {
	extendConfig: extendConfig
	, extendConfig: extendConfig
	, extendPlugins: extendPlugins
};