import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { IntlProvider } from 'react-intl';
import _ from 'underscore';
import I18nSwitch from './I18nSwitch';
import i18nLocales from './i18nLocales';


/*
 *	Takes negotiated locale, loads messages and polyfill (if necessary), handles language hot switch
 *  TODO: Dynamically add contextTypes to get access to global functions (is that possible?)
*/



export default class I18n extends Component {

	static propTypes = {

		children: PropTypes.element.isRequired,
		defaultLocale: PropTypes.string.isRequired

	};

	static defaultProps = {

		messages: null

	};

	static contextTypes = {

		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
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

		const propsSwitch = {

			onSwitch: this._handleSwitch.bind( this ),
			locales: i18nLocales.locales,
			locale: this.state.locale,
			dir: this.state.dir

		}

		return (

			<div id="i18n" dir={ this.state.dir } lang={ this.state.locale }>

				<I18nSwitch {...propsSwitch} />

				{ this.state.messages &&
					<IntlProvider {...this.state} >
						{this.props.children}
					</IntlProvider>
				}

			</div>

		)

	}

	_handleSwitch = function ( locale ) {

		if( locale !== this.state.locale ) {

			this._loadLocale ( locale );

		}

	}

	_loadLocale = function ( locale ) {

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

					let snackbarOptions = {

						active: true,
						msg: i18nLocales.messages.missing_translations_msg,
						action: i18nLocales.messages.missing_translations_link,
						onActionClick: this._goTranslate,
						delay: 1500

					}

					this.context.showSnackbar( snackbarOptions )

				}

				this.loadedLocales.push( i18nLocales );
				this.setState( { messages: i18nLocales.messages, locale: i18nLocales.locale, dir: i18nLocales.direction } );
				this.context.showLoader( false );

			} );

		}else{

			this.setState( { messages: cached.messages, locale: cached.locale, dir: cached.direction } );
			
		}

	}

	_getNegotiatedLocale ( ){

		let negotiatedLocale = document.documentElement.getAttribute( 'lang' );
		return negotiatedLocale;

	}

	_goTranslate () {

		console.log( "Sending user to translation page" );

	}

}
