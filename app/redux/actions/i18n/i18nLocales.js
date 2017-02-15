/*
 * TO ADD A LANGUAGE:
 * 1. Add in Locales (i18nLocales.js)
 * 2. Add loaders method (i18nLocales.js)
 * 3. Add in acceptsLanguages (server.js)
*/

import { addLocaleData } from 'react-intl';

const Locales = [
	{
		locale: 'en',
		name: 'English',
		en: 'English'
	},
	{
		locale: 'es',
		name: 'Español',
		en: 'Spanish'
	},
	{
		locale: 'de',
		name: 'Deutsch',
		en: 'German'
	},
	{
		locale: 'pt',
		name: 'Português',
		en: 'Portuguese'
	}/*,
	{
		locale: 'hi',
		name: 'हिन्दी, हिंदी',
		en: 'Hindi'
	},
	{
		locale: 'zh',
		name: '中文',
		en: 'Chinese'
	},
	{
		locale: 'ar',
		name: 'العربية',
		en: 'Arabic'
	},
	{
		locale: 'ru',
		name: 'русский',
		en: 'Russian'
	},
	{
		locale: 'bn',
		name: 'বাংলা',
		en: 'Bengali'
	},
	{
		locale: 'de',
		name: 'Deutsch',
		en: 'German'
	},
	{
		locale: 'it',
		name: 'Italiano',
		en: 'Italian'
	}*/
]

const hasIntl = typeof ( Intl ) !== 'undefined';
const loaders = { };

loaders.en = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/en.js', 'react-intl/locale-data/en', '../../../i18n/locales/en' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/en.js' ); 
				var localeData = require( 'react-intl/locale-data/en' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/en' );
				done ( null, i18n );

			},
			'en-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/en', '../../../i18n/locales/en' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/en' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/en' );
				done ( null, i18n );

			},
			'en'

		);

	}

}

loaders.de = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/de.js', 'react-intl/locale-data/de', '../../../i18n/locales/de' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/de.js' ); 
				var localeData = require( 'react-intl/locale-data/de' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/de' );
				done ( null, i18n );

			},
			'de-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/de', '../../../i18n/locales/de' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/de' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/de' );
				done ( null, i18n );

			},
			'de'

		);

	}

}

loaders.es = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/es.js', 'react-intl/locale-data/es', '../../../i18n/locales/es' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/es.js' ); 
				var localeData = require( 'react-intl/locale-data/es' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/es' );
				done ( null, i18n );

			},
			'es-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/es', '../../../i18n/locales/es' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/es' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/es' );
				done ( null, i18n );

			},
			'es'

		);

	}

}

loaders.pt = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/pt.js', 'react-intl/locale-data/pt', '../../../i18n/locales/pt' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/pt.js' ); 
				var localeData = require( 'react-intl/locale-data/pt' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/pt' );
				done ( null, i18n );

			},
			'pt-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/pt', '../../../i18n/locales/pt' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/pt' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/pt' );
				done ( null, i18n );

			},
			'pt'

		);

	}

}


/*loaders.it = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/it.js', 'react-intl/locale-data/it', '../../../i18n/locales/it' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/it.js' ); 
				var localeData = require( 'react-intl/locale-data/it' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/it' );
				done ( null, i18n );

			},
			'it-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/it', '../../../i18n/locales/it' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/it' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/it' );
				done ( null, i18n );

			},
			'it'

		);

	}

}

loaders.ru = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/ru.js', 'react-intl/locale-data/ru', '../../../i18n/locales/ru' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/ru.js' ); 
				var localeData = require( 'react-intl/locale-data/ru' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/ru' );
				done ( null, i18n );

			},
			'ru-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/ru', '../../../i18n/locales/ru' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/ru' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/ru' );
				done ( null, i18n );

			},
			'ru'

		);

	}

}

loaders.hi = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/hi.js', 'react-intl/locale-data/hi', '../../../i18n/locales/hi' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/hi.js' ); 
				var localeData = require( 'react-intl/locale-data/hi' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/hi' );
				done ( null, i18n );

			},
			'hi-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/hi', '../../../i18n/locales/hi' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/hi' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/hi' );
				done ( null, i18n );

			},
			'hi'

		);

	}

}

loaders.bn = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/bn.js', 'react-intl/locale-data/bn', '../../../i18n/locales/bn' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/bn.js' ); 
				var localeData = require( 'react-intl/locale-data/bn' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/bn' );
				done ( null, i18n );

			},
			'bn-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/bn', '../../../i18n/locales/bn' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/bn' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/bn' );
				done ( null, i18n );

			},
			'bn'

		);

	}

}

loaders.ar = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/ar.js', 'react-intl/locale-data/ar', '../../../i18n/locales/ar' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/ar.js' ); 
				var localeData = require( 'react-intl/locale-data/ar' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/ar' );
				done ( null, i18n );

			},
			'ar-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/ar', '../../../i18n/locales/ar' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/ar' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/ar' );
				done ( null, i18n );

			},
			'ar'

		);

	}

}

loaders.zh = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/zh.js', 'react-intl/locale-data/zh', '../../../i18n/locales/zh' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/zh.js' ); 
				var localeData = require( 'react-intl/locale-data/zh' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/zh' );
				done ( null, i18n );

			},
			'zh-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/zh', '../../../i18n/locales/zh' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/zh' );
				addLocaleData( localeData );
				var i18n = require( '../../../i18n/locales/zh' );
				done ( null, i18n );

			},
			'zh'

		);

	}

}*/

const loadLocale = function ( locale, done ){

	var loader = loaders[ locale ];
	loader ( done );

}

module.exports.loadLocale = ( locale, done ) => {

	if( !hasIntl ){

		require.ensure( [ 'intl' ],
			( require ) => {

				global.Intl = require( 'intl' );
				loadLocale( locale, done );

			}, 
			'intl-polyfill'
		);

	}else{

		loadLocale( locale, done );

	}

}

module.exports.locales = Locales;