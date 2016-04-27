import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import _ from 'underscore';

import Button from 'react-toolbox/lib/button';
import Tabs from '../Tabs/Tabs';

import style from './_stylei18nSwitch';

/*
 *	Loads language locales and names from i18n and creates a list of language links. Locale of link clicked is passed on to onSwitch
*/

export default class I18nSwitch extends Component {

	static propTypes = {

		locales: PropTypes.object.isRequired,
		onSwitch: PropTypes.func.isRequired,
		locale: PropTypes.string.isRequired

	}

	componentWillReceiveProps ( nextProps ){

		this.setState( { current: nextProps.locale } );

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			current: this.props.locale

		}

	}

	render () {

		const links = this._createLanguageLinks( );
		const cls = Classnames( style.languages );

		return (

			<Tabs id="Languages" center={ true } className={ cls }>
				{ links }
			</Tabs>

		)

	}

	_createLanguageLinks = ( ) => {

		return _.map( this.props.locales, ( locale ) => {

			let lang = locale.locale;
			let current = lang == this.state.current;

			return React.createElement( Button, {

				key: lang,
				hrefLang: lang,
				onClick: this._handleClick.bind( this, lang ),
				disabled: current,
				flat: true,
				accent: true

			}, locale.name );
					
		} );

	}

	_handleClick ( lang ) { 

		this.setState( { current: lang } );
		this.props.onSwitch( lang );

	}

}