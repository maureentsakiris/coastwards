// http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

const express = require( 'express' );
const path = require( 'path' );
const httpProxy = require( 'http-proxy' );
const helmet = require( 'helmet' );

const contributions = require( './server/contributions' );

var SERVER = { PORT: 3000 };

switch ( process.argv[ 3 ] ){

case 'office':
	SERVER.IP = '134.245.149.30'
	break;
case 'gerhard':
	SERVER.IP= '192.168.0.12'
	break;
default:
	SERVER.IP= '127.0.0.1'

}


const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 8888;
const publicPath = path.resolve( __dirname, 'public' );
//const uploadsPath = path.resolve( __dirname, 'uploads' );

const proxy = httpProxy.createProxyServer();
const app = express();

app.enable( 'trust proxy' );
app.use( helmet() );
app.use( express.static( publicPath ) );
app.set( 'view engine', 'pug' );

app.get( '/', function ( req, res ) {

	var lang = req.acceptsLanguages( 'es', 'en', 'de' );
	res.render( 'index', { lang: lang } );

} );

app.use( '/contributions', contributions );


if ( !isProduction ) {

	var bundle = require( './server/bundle.js' );
	bundle();

	app.all( '/build/*', function ( req, res ) {

		proxy.web( req, res, {

			target: 'http://' + SERVER.IP + ':' + SERVER.PORT

		} );

	} );

	proxy.on( 'error', function ( ) {

		console.log( 'Could not connect to proxy, please try again...' );

	} );

}

// And run the server
app.listen( port, function () {

	console.log( 'Server running on port ' + port );

} ); 