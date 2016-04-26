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

		const { elementHandlers, elementProps, elementStates, ...ownProps } = this.props;
		const { value } = elementStates;

		const flag = value ? true : false;

		const cls = Classnames( style.checkbox, this.props.elementProps.className );

		return (

			<Checkbox { ...ownProps } { ...elementProps } { ...elementHandlers } checked={ flag } className={ cls } />

		)

	}

}

export default ElementTB ( CheckboxTB );   
