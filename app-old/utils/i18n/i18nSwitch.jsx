import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import _ from 'underscore';

import Button from '../MDL/Button';
import Tabs from '../Tabs/Tabs';

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

		return (

			<Tabs tag="nav">
				{ links }
			</Tabs>

		)

	}

	_handleClick ( lang ){ 

		this.setState( { current: lang } );
		this.props.onSwitch( lang );

	}

	_createLanguageLinks ( ){

		return _.map( this.props.locales, ( locale ) => {

			let lang = locale.locale;
			let current = lang == this.state.current;

			const cls = Classnames( 'mdl-button mdl-js-button mdl-button--accent', {

				'current': current

			} )

			return React.createElement( Button, {

				key: lang,
				hrefLang: lang,
				onClick: this._handleClick.bind( this, lang ),
				className: cls,
				disabled: current,
				color: false,
				raise: false,
				accent: true

			}, locale.name );
					
		} );

	}

}