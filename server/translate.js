const express = require( 'express' );
const router = express.Router();


router.get( '/', function ( req, res ) {

	res.render( 'translate', { lang: req.params.lang } );

} );

module.exports = router;