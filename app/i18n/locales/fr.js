const translations = require( '../translations.js' )
const _ = require( 'underscore' )

const messages = _.mapObject( translations, ( val ) => {

	return val[ 'fr' ]

} )

module.exports = {

	locale: 'fr',
	dir: 'ltr',
	messages: messages

}