import i18nLocales from 'i18n/i18nLocales'
import { addLocaleData } from 'react-intl'

/*
 * action types
 */

export const LOAD_LANGUAGE_FULLFILLED = 'LOAD_LANGUAGE_FULLFILLED'
export const LOAD_LANGUAGE_PENDING = 'LOAD_LANGUAGE_PENDING'
export const LOAD_LANGUAGE_REJECTED = 'LOAD_LANGUAGE_REJECTED'

/*
 * action creators
 */

/*export function setLanguage ( locale ) {

	const messages = { helloWorld: 'Hello world' }
	const dir= "ltr"
	return { type: LOAD_LANGUAGE, locale, dir, messages }

}*/

function promiseLanguage ( locale ) {

	return new Promise( ( resolve, reject ) => {

		i18nLocales.loadLocale( locale, ( error, i18nLocales ) => {

			if( error ){

				reject( error )

			}else{

				resolve( i18nLocales )

			}

		} )

	} )

}

export function loadLanguage ( locale ) {

	/*var localeData = require( 'react-intl/locale-data/' + locale );
	var s = addLocaleData( localeData );
	console.log( s )
	return { type: LOAD_LANGUAGE_FULLFILLED, locale: locale, dir: 'ltr', messages: { 'help_science': locale } }*/

	/*return function ( dispatch ){

		console.log( "Dispatching action pending" )
		dispatch( { 

			type: LOAD_LANGUAGE_PENDING, 
			locale: locale, 
			dir: 'ltr', 
			messages: { 'help_science': 'Loading language: ' + locale } 

		} )

		return promiseLanguage( locale )  //eslint-disable-line promise/always-return
		.then( ( i18nLocales ) => {

			console.log( "Dispatching action fullfilled" )
			dispatch( {

				type: LOAD_LANGUAGE_FULLFILLED, 
				locale: i18nLocales.locale,
				dir: i18nLocales.direction, 
				messages: i18nLocales.messages


			}  )

		} ).catch( ( error ) => 

			console.log( "ERROR LOADING LANGUAGE: ", error )

		)

	}	*/

}