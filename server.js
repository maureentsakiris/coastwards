const express = require( 'express' );
const path = require( 'path' );
const helmet = require( 'helmet' );

const globalConfigs = require ( './config/' );

const contribute = require( './server/contribute' );
const contact = require( './server/contact' );
const administrate = require( './server/administrate' );
const data = require( './server/data' );

const publicPath = path.resolve( __dirname, 'public' );

const webpackDevMiddleware = require( "webpack-dev-middleware" );
const webpackHotMiddleware = require( "webpack-hot-middleware" );
const webpack = require( "webpack" );
const webpackConfig = require( "./webpack.dev.config.js" );

const isProduction = globalConfigs.env === 'production';
const server = globalConfigs.server;
const portToListen = isProduction ? server.port : 8888;



const app = express();

app.enable( 'trust proxy' );
app.use( helmet() );
app.use( express.static( publicPath ) );

app.set( 'view engine', 'pug' );
app.set( 'views', path.resolve( __dirname, './app/views' ) );

app.get( '/', function ( req, res ) {

	var lang = req.acceptsLanguages( [ 'en', 'es', 'ar', 'de', 'zh', 'el', 'hi', 'pt' ] );
	res.render( 'index', { lang: lang } );

} );

app.use( '/contribute', contribute );
app.use( '/contact', contact );
app.use( '/administrate', administrate );
app.use( '/data', data );

app.get( '/data', function ( req, res ) {

	res.render( 'data' );

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


app.get( '/login/github', passport.authenticate( 'github', { scope: [ 'user:email' ] } ), ( ) => {

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

	app.use( webpackDevMiddleware( compiler, {

		publicPath: "/build/", // Same as `output.publicPath` in most cases.
		stats: "errors-only"
		
	} ) );

	app.use( webpackHotMiddleware( compiler, {

		log: console.log
		
	} ) );

}


app.listen( portToListen, function () {

	console.log( "Listening on port " + portToListen );

} );
