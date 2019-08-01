const translations = require( '../translations.js' )
const _ = require( 'underscore' )

const messages = _.mapObject( translations, ( val ) => {

	return val[ 'it' ]

} )

module.exports = {

	locale: 'it',
	dir: 'ltr',
	messages: messages

}