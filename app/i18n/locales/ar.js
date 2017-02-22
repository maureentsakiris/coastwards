const translations = require( '../translations.js' )
const _ = require( 'underscore' )

const messages = _.mapObject( translations, ( val ) => {

	return val[ 'ar' ]

} )

module.exports = {

	locale: 'ar',
	dir: 'rtl',
	messages: messages

}