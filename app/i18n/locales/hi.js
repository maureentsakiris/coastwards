const translations = require( '../translations.js' )
const _ = require( 'underscore' )

const messages = _.mapObject( translations, ( val ) => {

	return val[ 'hi' ]

} )

module.exports = {

	locale: 'hi',
	dir: 'ltr',
	messages: messages

}