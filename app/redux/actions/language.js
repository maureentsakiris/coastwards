import * as types from 'types'
import i18nLocales from 'i18n/i18nLocales'


export function loadLanguage ( locale ) {

	return function ( dispatch ) {

		i18nLocales.loadLocale( locale, ( error, i18nLocales ) => {

			if( error ){

				dispatch( {
					type: types.SHOW_DIALOG,
					message: error

				} )

			}else{

				dispatch( {
					type: types.LOAD_LANGUAGE,
					locale: i18nLocales.locale,
					dir: i18nLocales.dir,
					messages: i18nLocales.messages

				} )

			}

		} )

	}

}