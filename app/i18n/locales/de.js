const translations = require( '../translations.js' )
const _ = require( 'underscore' )

const messages = _.mapObject( translations, ( val ) => {

	return val[ 'de' ]

} )

module.exports = {

	locale: 'de',
	dir: 'ltr',
	messages: messages

}