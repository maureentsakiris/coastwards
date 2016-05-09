import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ElementTB } from '../ElementTB/ElementTB';
import Classnames from 'classnames'; 

import Checkbox from 'react-toolbox/lib/checkbox';

import style from './_styleCheckboxTB';


class CheckboxTB extends Component {

	static propTypes = {

		elementHandlers: PropTypes.object.isRequired,
		elementProps: PropTypes.object.isRequired,
		elementStates: PropTypes.object.isRequired,

		defaultChecked: function ( props, propName ) {

			if ( props[ propName ] ) {

				return new Error( 'Setting defaultChecked will have no effect. Set value instead.' );

			}

		}

	};


	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { elementHandlers, elementProps, elementStates, ...ownProps } = this.props; // eslint-disable-line no-unused-vars
		const { form, name, label, disabled, className } = elementProps; // eslint-disable-line no-unused-vars
		const { value, showErrors, error, submitting, elementIsValid } = elementStates;	// eslint-disable-line no-unused-vars
		const { ...restProps } = ownProps;

		const flag = value ? true : false;

		const cls = Classnames( style.checkbox, className );

		return (

			<Checkbox { ...restProps } { ...elementProps } { ...elementHandlers } checked={ flag } className={ cls } />

		)

	}

}

export default ElementTB ( CheckboxTB );   
