const express = require( 'express' )
const router = express.Router()
var cookieParser = require( 'cookie-parser' )
var session = require( 'express-session' )
var passport = require( 'passport' )
var flash = require( 'connect-flash' )
var LocalStrategy = require( 'passport-local' ).Strategy

const user = { 

	username: 'maureen',
	password: 'go',
	id: 1

}

router.use( session( { 

	secret: 'figuiiiin',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }


} ) )

router.use( cookieParser() )
router.use( passport.initialize() )
router.use( passport.session() )
router.use( flash() )

passport.use( 'local', new LocalStrategy(

	function ( username, password, done ) {

		console.log( username )
		console.log( password )

		if ( username == user.username && password == user.password ){

			console.log( "should authenticate" )
			return done( null, user )

		}else{

			return done( null, false, { message: 'Nope!' } )

		}

	}

) )


router.get( '/', function ( req, res ) {

	res.render( 'login' );

} );

router.post( '/authenticate',
	
	passport.authenticate( 'local', { successRedirect: '/admin', failureRedirect: '/login', failureFlash: true } )

);

module.exports = router;



/*User.findOne( { username: username }, function ( err, user ) {

	if ( err ) { 

		return done( err )

	}

	if ( !user ) {

		return done( null, false, { message: 'Incorrect username.' } )
	
	}

	if ( !user.validPassword( password ) ) {

		return done( null, false, { message: 'Incorrect password.' } )

	}
	
	return done( null, user )

} )*/