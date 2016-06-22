const Webpack = require( 'webpack' );
const WebpackDevServer = require( 'webpack-dev-server' );
const webpackConfig = require( './../webpack.dev.config.js' );


module.exports = function () {

	var bundleStart = null;
	const compiler = Webpack( webpackConfig );


	compiler.plugin( 'compile', function ( ) {

		console.log( 'Bundling...' );
		bundleStart = Date.now();

	} );

	compiler.plugin( 'done', function ( ) {

		console.log( 'Bundled in ' + ( Date.now() - bundleStart )  + 'ms! Ready to go!' );

	} );

	const bundler = new WebpackDevServer( compiler, {

		publicPath: '/build/',
		hot: true,
		historyApiFallback: true,
		quiet: false,
		noInfo: true,
		progress: false,
		colors: true,
		stats: {

			colors: true

		}

	} );

	bundler.listen( webpackConfig.server.port, webpackConfig.server.ip, function () {

		console.log( 'Bundling project, please wait...' );

	} );

};
