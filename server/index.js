// http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

const express = require( 'express' );
const path = require( 'path' );
const httpProxy = require( 'http-proxy' );
const helmet = require( 'helmet' );


const contributions = require( './contributions' );

const globalConfigs = require ( '../config/' ) ;

const server = globalConfigs.server;

const isProduction = globalConfigs.env === 'production';
const port = server.port;


const PROJECT_ROOT = path.resolve( './' );
const PUBLIC_ROOT = path.join( PROJECT_ROOT, 'public' );
const HTDOCS	= path.join ( PROJECT_ROOT , 'build' , globalConfigs.env ) ;

const proxy = httpProxy.createProxyServer();
const app = express();

app.enable( 'trust proxy' );
app.use( helmet() );

console.log ( 'serving static "%s"' , HTDOCS ) ;
app.use( '/' , express.static( HTDOCS ) );

app.all ( '/' , function  ( req , res ) {
	res.redirect ( '/index.html' ) ;
} )

app.use( '/contributions', contributions );

// And run the server
app.listen( port, function () {

	console.log( 'Server running on port ' + port );

} ); 