const express = require( 'express' );
/*const path = require( 'path' );*/
const httpProxy = require( 'http-proxy' );

const helmet = require( 'helmet' );

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 8888;
/*const publicPath = path.resolve( __dirname, 'public' );*/

const proxy = httpProxy.createProxyServer();
const app = express();

app.use( helmet() );
app.set( 'view engine', 'pug' );

app.post( '/', function ( req, res ) {

	res.send( 'Got a POST request' );

} );

/*app.all( '/', function ( req, res, next ) {

	//https://strongloop.com/strongblog/bypassing-express-view-rendering-for-speed-and-modularity/
	res.lang = req.acceptsLanguages( 'es', 'en', 'de' );
	next();

}, express.static( publicPath ) );*/

app.get( '/', function ( req, res ) {

	var lang = req.acceptsLanguages( 'es', 'en', 'de' );
	res.render( 'index', { lang: lang } );

} );


//app.use( express.static( publicPath ) );

if ( !isProduction ) {

	var bundle = require( './server/bundle.js' );
	bundle();

	app.all( '/build/*', function ( req, res ) {

		proxy.web( req, res, {

			target: 'http://134.245.149.30:3000'

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