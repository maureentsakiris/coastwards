import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { IntlProvider } from 'react-intl';
import _ from 'underscore';

import I18nSwitch from './i18nSwitch';
import i18nLocales from './i18nLocales';


/*
 *	Takes negotiated locale, loads messages and polyfill (if necessary), handles language hot switch
 *  TODO: Dynamically add contextTypes to get access to global functions (is that possible?)
 *	NOTE: ClassName is passed on to i18nSwitch cos if anything, the switch will be styled and not the wrapper
 *  TODO: Allow for different switch styles, eg. instead of tabs a dropdown
*/



export default class I18n extends Component {

	static propTypes = {

		className: PropTypes.string,
		children: PropTypes.element.isRequired,
		defaultLocale: PropTypes.string.isRequired,
		hotSwitch: PropTypes.bool,
		helpTranslateURL: PropTypes.string

	};

	static defaultProps = {

		messages: null,
		hotSwitch: false

	};

	static contextTypes = {

		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func,
		showDialog: PropTypes.func,
		logError: PropTypes.func
		
	}

	componentWillMount = function ( ){

		this._loadLocale( this.props.defaultLocale );

	}

	componentDidMount = function ( ){

		let negotiatedLocale = this._getNegotiatedLocale() || this.props.defaultLocale;
		this._loadLocale( negotiatedLocale );

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.messagesMaster;
		this.loadedLocales = [];

		this.state = {

			locale: this.props.defaultLocale,
			messages: undefined,
			dir: 'ltr'

		}

	}

	render () {

		const { className, hotSwitch } = this.props;

		const propsI18nSwitch = {

			onSwitch: this._handleSwitch,
			locales: i18nLocales.locales,
			locale: this.state.locale,
			className: className

		}

		return (

			<div id="i18n" dir={ this.state.dir } lang={ this.state.locale } >

				{ hotSwitch && <I18nSwitch { ...propsI18nSwitch } /> }

				{ this.state.messages &&
					<IntlProvider { ...this.state } >
						{ this.props.children }
					</IntlProvider>
				}

			</div>

		)

	}

	_handleSwitch = ( locale ) => {

		if( locale !== this.state.locale ) {

			this._loadLocale ( locale );

		}

	}

	_loadLocale = ( locale ) => {

		let cached = _.findWhere( this.loadedLocales, { locale: locale } );

		if( !cached ){

			this.context.showLoader( true );

			i18nLocales.loadLocale ( locale, ( error, i18nLocales ) => {

				// Ignoring error, any missing translation files will be caught when compiling

				let missingTranslations;

				if( locale == this.props.defaultLocale ) {

					this.messagesMaster = _.chain( i18nLocales.messages ).keys().uniq().value();

				}else{

					let messages = _.chain( i18nLocales.messages ).keys().uniq().value();
					missingTranslations = _.difference( this.messagesMaster, messages );

				}

				if( missingTranslations && missingTranslations.length > 0 ){

					/*let snackbarOptions = {

						label: util.format( 'Help us translate this page into %s', i18nLocales.english ),
						action: 'GO',
						onClick: this._goTranslate

					}

					this.context.showSnackbar( snackbarOptions );*/

				}

				this.loadedLocales.push( i18nLocales );
				this.setState( { messages: i18nLocales.messages, locale: i18nLocales.locale, dir: i18nLocales.direction } );
				this.context.showLoader( false );

			} );

		}else{

			this.setState( { messages: cached.messages, locale: cached.locale, dir: cached.direction } );
			
		}

	}

	_getNegotiatedLocale = ( ) => {

		let negotiatedLocale = document.documentElement.getAttribute( 'lang' );
		return negotiatedLocale;

	}

	_goTranslate = () => {

		window.location = "/translate?lang=" + this.state.locale;

	}


}
