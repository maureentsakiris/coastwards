const express = require( 'express' );
const path = require( 'path' );
const helmet = require( 'helmet' );

const globalConfigs = require ( './config/' );

const contribute = require( './server/contribute' );
const contact = require( './server/contact' );
const administrate = require( './server/administrate' );
const data = require( './server/data' );
// const app = require( './server/app' );

const publicPath = path.resolve( __dirname, 'public' );

const webpackDevMiddleware = require( "webpack-dev-middleware" );
const webpackHotMiddleware = require( "webpack-hot-middleware" );
const webpack = require( "webpack" );
const webpackConfig = require( "./webpack.dev.config.js" );

const isProduction = globalConfigs.env === 'production';
const server = globalConfigs.server;
const portToListen = isProduction ? server.port : 8888;



const exp = express();

exp.enable( 'trust proxy' );
exp.use( helmet() );
exp.use( express.static( publicPath ) );

exp.set( 'view engine', 'pug' );
exp.set( 'views', path.resolve( __dirname, './app/views' ) );

exp.get( '/', function ( req, res ) {

	var lang = req.acceptsLanguages( [ 'en', 'es', 'ar', 'de', 'zh', 'el', 'hi', 'pt', 'fr', 'it' ] );
	res.render( 'index', { lang: lang } );

} );

exp.use( '/contribute', contribute );
exp.use( '/contact', contact );
exp.use( '/administrate', administrate );
exp.use( '/data', data );

exp.get( '/data', function ( req, res ) {

	res.render( 'data' );

} );

// exp.use( '/app', app );
exp.get( '/map', function ( req, res ) {

	var lang = req.acceptsLanguages( [ 'en', 'es', 'ar', 'de', 'zh', 'el', 'hi', 'pt', 'fr', 'it' ] );
	res.render( 'map', { lang: lang } );

} );

exp.get( '/privacypolicy', function ( req, res ) {

	var lang = req.acceptsLanguages( [ 'en' ] );
	res.render( 'privacypolicy', { lang: lang } );

} );


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


exp.use( bodyParser.json() )
exp.use( bodyParser.urlencoded( {

	extended: true

} ) )
exp.use( session( { 

	secret: 'figuiiiin',
	resave: false,
	saveUninitialized: false

} ) )


exp.use( passport.initialize() )  
exp.use( passport.session() )  


exp.get( '/login', ( req, res ) => {

	res.render( 'login', { user: req.user } )

} );


exp.get( '/login/github', passport.authenticate( 'github', { scope: [ 'user:email' ] } ), ( ) => {

	// The request will be redirected to GitHub for authentication, so this
	// function will not be called.

} )

exp.get( '/login/callback', passport.authenticate( 'github', { failureRedirect: '/login' } ), ( req, res ) => {

	res.redirect( '/admin' )

} ) 

exp.get( '/admin', ensureAuthenticated, ( req, res ) => {

	if( req.user.username == 'maureentsakiris' || req.user.username == 'ClaudiaCAU' ){

		res.render( 'admin', { user: req.user } )

	}else{

		res.send( 'Sorry, you are not authorized to use the admin!' )

	}

} )

exp.get( '/logout', ( req, res ) => {

	req.logout()
	res.redirect( '/' )

} )


function ensureAuthenticated ( req, res, next ) {

	if ( req.isAuthenticated() ) { 

		return next()

	}

	res.redirect( '/login' )

}


if( !isProduction ){

	const compiler = webpack( webpackConfig );

	exp.use( webpackDevMiddleware( compiler, {

		publicPath: "/build/", // Same as `output.publicPath` in most cases.
		stats: "errors-only"
		
	} ) );

	exp.use( webpackHotMiddleware( compiler, {

		log: console.log
		
	} ) );

}


exp.listen( portToListen, function () {

	console.log( "Listening on port " + portToListen );

} );
