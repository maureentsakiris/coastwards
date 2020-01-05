const express = require( 'express' )
const router = express.Router()




router.post( '/:contribution_id', function ( req, res ) {

	var lang = req.acceptsLanguages( [ 'en', 'es', 'ar', 'de', 'zh', 'el', 'hi', 'pt', 'fr', 'it' ] );
	res.render( 'map', { lang: lang, contribution_id: req.params.contribution_id } );

} );


module.exports = router
