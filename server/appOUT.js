const express = require( 'express' )
const router = express.Router()




router.get( '/map', function ( req, res ) {

	var lang = req.acceptsLanguages( [ 'en' ] );
	res.render( 'map', { lang: lang } );

} );


module.exports = router
