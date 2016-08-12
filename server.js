// http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

const express = require( 'express' );
const path = require( 'path' );
const httpProxy = require( 'http-proxy' );
const helmet = require( 'helmet' );

const globalConfigs = require ( './config/' );
const isProduction = globalConfigs.env === 'production';
const server = globalConfigs.server;
const portToListen = isProduction ? server.port : 8888;

const contributions = require( './server/contributions' );
const translate = require( './server/translate' );


const publicPath = path.resolve( __dirname, 'public' );
//const uploadsPath = path.resolve( __dirname, 'uploads' );

const proxy = httpProxy.createProxyServer();
const app = express();

app.enable( 'trust proxy' );
app.use( helmet() );
app.use( express.static( publicPath ) );
app.set( 'view engine', 'pug' );
app.set( 'views', path.resolve( __dirname, './app/views' ) );

app.get( '/', function ( req, res ) {

	var lang = req.acceptsLanguages( 'es', 'en', 'de' );
	res.render( 'index', { lang: lang } );

} );

app.use( '/contributions', contributions );
app.use( '/translate', translate );

if ( !isProduction ) {

	var bundle = require( './server/bundle.js' );
	bundle();

	app.all( '/build/*', function ( req, res ) {

		proxy.web( req, res, {

			target: 'http://' + server.ip + ':' + server.port

		} );

	} );

	proxy.on( 'error', function ( ) {

		console.log( 'Could not connect to proxy, please try again...' );

	} );

}

// And run the server
app.listen( portToListen, function () {

	console.log( 'Server running on port: ' + portToListen );

} ); 