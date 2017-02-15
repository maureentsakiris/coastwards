const translations = require( '../translations.js' )
const _ = require( 'underscore' )

const messages = _.mapObject( translations, ( val ) => {

	return val[ 'en' ]

} )

module.exports = {

	locale: 'en',
	dir: 'ltr',
	messages: messages

}
