const translations = require( '../translations.js' )
const _ = require( 'underscore' )

const messages = _.mapObject( translations, ( val ) => {

	return val[ 'zh' ]

} )

module.exports = {

	locale: 'zh',
	dir: 'ltr',
	messages: messages

}