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

		onSwitch: PropTypes.func.isRequired,
		locales: PropTypes.object.isRequired,
		locale: PropTypes.string.isRequired,
		className: PropTypes.string

	}

	componentWillReceiveProps ( nextProps ){

		this.setState( { current: nextProps.locale } );

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			current: this.props.locale,
			tabActive: 0

		}

	}

	render () {

		const { locales, className } = this.props;
		const cls = Classnames( style.languages, className );

		const links = this._createLanguageLinks( );
		const active = _.chain( locales ).keys().indexOf( this.state.current ).value();

		return (

			<Tabs arrows={ true } id="Languages" className={ cls } active={ active }>
				{ links }
			</Tabs>

		)

	}

	_createLanguageLinks = ( ) => {

		return _.map( this.props.locales, ( locale ) => {

			let lang = locale.locale;
			let flag = lang === this.state.current;

			return React.createElement( Button, {

				key: lang,
				hrefLang: lang,
				onClick: this._handleClick.bind( this, lang ),
				disabled: flag,
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