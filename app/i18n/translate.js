const fs = require( 'fs' );
const glob = require( 'glob' )

const MESSAGES_PATTERN = './app/i18n/react-intl/**/*.json'

const translations = require( './translations.js' )

glob.sync( MESSAGES_PATTERN )
.map( ( filename ) => fs.readFileSync( filename, 'utf8' ) )
.map( ( file ) => JSON.parse( file ) )
.reduce( ( collection, descriptors ) => {

	descriptors.forEach( ( { id, defaultMessage } ) => {
		
		const translation = translations[ id ]
		if( !translation ){

			console.log( "Missing entry in translations: ", id );
			console.log( "defaultMessage: ", defaultMessage );
			console.log( "--------------------------------------" );

		}

	} )

	return collection

}, {} )