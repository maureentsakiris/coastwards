// http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

const express = require( 'express' );
const path = require( 'path' );
const httpProxy = require( 'http-proxy' );
const helmet = require( 'helmet' );

const globalConfigs = require ( './config/' );
const isProduction = globalConfigs.env === 'production';
const server = globalConfigs.server;
const portToListen = isProduction ? server.port : 8888;

//const validate = require( './server/validate' );
const contribute = require( './server/contribute' );
const contact = require( './server/contact' );
const administrate = require( './server/administrate' );

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

	var lang = req.acceptsLanguages( [ 'en', 'es', 'pt', 'ar' ] );
	res.render( 'index', { lang: lang } );

} );

//app.use( '/validate', validate );
app.use( '/contribute', contribute );
app.use( '/contact', contact );
app.use( '/administrate', administrate );

/*app.get( '/newsletter', ( req, res ) => {

	var lang = req.acceptsLanguages( [ 'en', 'es', 'de' ] );
	res.render( 'newsletter', { lang: lang } );

} );*/


const passport = require( 'passport' )
const session = require( 'express-session' )
const bodyParser = require( 'body-parser' )
const GitHubStrategy = require( 'passport-github2' ).Strategy;


passport.serializeUser( ( user, done ) => {

	done( null, user )

} )

passport.deserializeUser( ( obj, done ) => {

	done( null, obj )

} )

passport.use( new GitHubStrategy( {

	clientID: globalConfigs.github.GITHUB_CLIENT_ID,
	clientSecret: globalConfigs.github.GITHUB_CLIENT_SECRET,
	callbackURL: globalConfigs.github.callbackURL

}, ( accessToken, refreshToken, profile, done ) => {

	// asynchronous verification, for effect...
	process.nextTick( () => {
		
		return done( null, profile )

	} )

} ) )


app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( {

	extended: true

} ) )
app.use( session( { 

	secret: 'figuiiiin',
	resave: false,
	saveUninitialized: false

} ) )


app.use( passport.initialize() )  
app.use( passport.session() )  


app.get( '/login', ( req, res ) => {

	res.render( 'login', { user: req.user } )

} );


app.get( '/login/github', passport.authenticate( 'github', { scope: [ 'user:email' ] } ), ( req, res ) => {

		// The request will be redirected to GitHub for authentication, so this
		// function will not be called.

} )

app.get( '/login/callback', passport.authenticate( 'github', { failureRedirect: '/login' } ), ( req, res ) => {

	res.redirect( '/admin' )

} ) 

app.get( '/admin', ensureAuthenticated, ( req, res ) => {

	if( req.user.username == 'maureentsakiris' ){

		res.render( 'admin', { user: req.user } )

	}else{

		res.send( 'Sorry, you are not authorized to use the admin!' )

	}

} )

app.get( '/logout', ( req, res ) => {

	req.logout()
	res.redirect( '/login' )

} )


function ensureAuthenticated ( req, res, next ) {

	if ( req.isAuthenticated() ) { 

		return next()

	}

	res.redirect( '/login' )

}




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