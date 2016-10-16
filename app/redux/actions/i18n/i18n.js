import * as types from 'types'
import i18nLocales from './i18nLocales'


export function loadLanguage ( locale ) {

	return function ( dispatch ) {

		i18nLocales.loadLocale( locale, ( error, i18nLocales ) => {

			if( error ){

				dispatch( {
					
					type: types.SHOW_DIALOG,
					message: error

				} )

			}else{

				const { locale, dir, messages } = i18nLocales

				document.getElementsByTagName( 'html' )[ 0 ].setAttribute( 'lang', locale )
				document.getElementsByTagName( 'html' )[ 0 ].setAttribute( 'dir', dir )

				dispatch( {

					type: types.LOAD_LANGUAGE,
					locale: locale,
					dir: dir,
					messages: messages

				} )

			}

		} )

	}

}