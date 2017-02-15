const translations = require( '../translations.js' )
const _ = require( 'underscore' )

const messages = _.mapObject( translations, ( val ) => {

	return val[ 'pt' ]

} )

module.exports = {

	locale: 'pt',
	dir: 'ltr',
	messages: messages

}