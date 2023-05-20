const path = require( 'path' )

module.exports = {
	PUBLIC_PATH: path.resolve( __dirname, '../public' ),
	PICTURE_UPLOADS_PATH: path.resolve( __dirname, '../public/uploads' ),
	TEMP_UPLOADS_PATH: path.resolve( __dirname, '../public/temp' ),
	/** TODO: when SSL is enabled, we want to use https: here */
	BASE_URL: `http://coastwards.org`
}
