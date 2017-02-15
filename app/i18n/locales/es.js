const translations = require( '../translations.js' )
const _ = require( 'underscore' )

const messages = _.mapObject( translations, ( val ) => {

	return val[ 'es' ]

} )

module.exports = {

	locale: 'es',
	dir: 'ltr',
	messages: messages

}