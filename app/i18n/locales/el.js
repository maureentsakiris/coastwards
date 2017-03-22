const translations = require( '../translations.js' )
const _ = require( 'underscore' )

const messages = _.mapObject( translations, ( val ) => {

	return val[ 'el' ]

} )

module.exports = {

	locale: 'el',
	dir: 'ltr',
	messages: messages

}