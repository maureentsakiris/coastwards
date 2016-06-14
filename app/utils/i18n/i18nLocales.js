/*
 * TO ADD A LANGUAGE:
 * 1. Add in Locales (i18nLocales.js)
 * 2. Add loaders method (i18nLocales.js)
 * 3. Add in acceptsLanguages (server.js)
 * 4. Adjust mediaqueries to show/hide arrows and justify-content left/center
*/

import { addLocaleData } from 'react-intl';

const Locales = {
	en: {
		locale: 'en',
		name: 'English'
	},
	de: {
		locale: 'de',
		name: 'Deutsch'
	},
	es: {
		locale: 'es',
		name: 'Español'
	},
	/*it: {
		locale: 'it',
		name: 'Italiano'
	},
	ru: {
		locale: 'ru',
		name: 'русский'
	},*/
	hi: {
		locale: 'hi',
		name: 'हिन्दी, हिंदी'
	},
	/*bn: {
		locale: 'bn',
		name: 'বাংলা'
	},*/
	ar: {
		locale: 'ar',
		name: 'العربية'
	},
	zh: {
		locale: 'zh',
		name: '中文'
	}
};

const hasIntl = typeof ( Intl ) !== 'undefined';
const loaders = { };

loaders.en = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/en.js', 'react-intl/locale-data/en', './en' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/en.js' ); 
				var localeData = require( 'react-intl/locale-data/en' );
				addLocaleData( localeData );
				var i18n = require( './en' );
				done ( null, i18n );

			},
			'en-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/en', './en' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/en' );
				addLocaleData( localeData );
				var i18n = require( './en' );
				done ( null, i18n );

			},
			'en'

		);

	}

}

loaders.de = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/de.js', 'react-intl/locale-data/de', './de' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/de.js' ); 
				var localeData = require( 'react-intl/locale-data/de' );
				addLocaleData( localeData );
				var i18n = require( './de' );
				done ( null, i18n );

			},
			'de-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/de', './de' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/de' );
				addLocaleData( localeData );
				var i18n = require( './de' );
				done ( null, i18n );

			},
			'de'

		);

	}

}

loaders.es = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/es.js', 'react-intl/locale-data/es', './es' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/es.js' ); 
				var localeData = require( 'react-intl/locale-data/es' );
				addLocaleData( localeData );
				var i18n = require( './es' );
				done ( null, i18n );

			},
			'es-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/es', './es' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/es' );
				addLocaleData( localeData );
				var i18n = require( './es' );
				done ( null, i18n );

			},
			'es'

		);

	}

}

loaders.it = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/it.js', 'react-intl/locale-data/it', './it' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/it.js' ); 
				var localeData = require( 'react-intl/locale-data/it' );
				addLocaleData( localeData );
				var i18n = require( './it' );
				done ( null, i18n );

			},
			'it-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/it', './it' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/it' );
				addLocaleData( localeData );
				var i18n = require( './it' );
				done ( null, i18n );

			},
			'it'

		);

	}

}

loaders.ru = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/ru.js', 'react-intl/locale-data/ru', './ru' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/ru.js' ); 
				var localeData = require( 'react-intl/locale-data/ru' );
				addLocaleData( localeData );
				var i18n = require( './ru' );
				done ( null, i18n );

			},
			'ru-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/ru', './ru' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/ru' );
				addLocaleData( localeData );
				var i18n = require( './ru' );
				done ( null, i18n );

			},
			'ru'

		);

	}

}

loaders.hi = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/hi.js', 'react-intl/locale-data/hi', './hi' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/hi.js' ); 
				var localeData = require( 'react-intl/locale-data/hi' );
				addLocaleData( localeData );
				var i18n = require( './hi' );
				done ( null, i18n );

			},
			'hi-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/hi', './hi' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/hi' );
				addLocaleData( localeData );
				var i18n = require( './hi' );
				done ( null, i18n );

			},
			'hi'

		);

	}

}

loaders.bn = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/bn.js', 'react-intl/locale-data/bn', './bn' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/bn.js' ); 
				var localeData = require( 'react-intl/locale-data/bn' );
				addLocaleData( localeData );
				var i18n = require( './bn' );
				done ( null, i18n );

			},
			'bn-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/bn', './bn' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/bn' );
				addLocaleData( localeData );
				var i18n = require( './bn' );
				done ( null, i18n );

			},
			'bn'

		);

	}

}

loaders.ar = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/ar.js', 'react-intl/locale-data/ar', './ar' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/ar.js' ); 
				var localeData = require( 'react-intl/locale-data/ar' );
				addLocaleData( localeData );
				var i18n = require( './ar' );
				done ( null, i18n );

			},
			'ar-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/ar', './ar' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/ar' );
				addLocaleData( localeData );
				var i18n = require( './ar' );
				done ( null, i18n );

			},
			'ar'

		);

	}

}

loaders.zh = ( done ) => {

	if ( !hasIntl ){

		require.ensure(

			[ 'intl/locale-data/jsonp/zh.js', 'react-intl/locale-data/zh', './zh' ],
			( require ) => {

				require( 'intl/locale-data/jsonp/zh.js' ); 
				var localeData = require( 'react-intl/locale-data/zh' );
				addLocaleData( localeData );
				var i18n = require( './zh' );
				done ( null, i18n );

			},
			'zh-polyfill'

		);

	}else{

		require.ensure(

			[ 'react-intl/locale-data/zh', './zh' ],
			( require ) => {

				var localeData = require( 'react-intl/locale-data/zh' );
				addLocaleData( localeData );
				var i18n = require( './zh' );
				done ( null, i18n );

			},
			'zh'

		);

	}

}

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
