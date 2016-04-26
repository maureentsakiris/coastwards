import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ElementTB } from '../ElementTB/ElementTB';
import Classnames from 'classnames'; 

import Input from 'react-toolbox/lib/input';


import style from './_styleInputTB';

class InputTB extends Component {

	static propTypes = {

		elementHandlers: PropTypes.object.isRequired,
		elementProps: PropTypes.object.isRequired,
		elementStates: PropTypes.object.isRequired,

		type: PropTypes.oneOf( [ 'text', 'password', 'email', 'number' ] )

	};

	static defaultProps = {

		type: 'text'

	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { elementHandlers, elementProps, elementStates, ...ownProps } = this.props;
		const { value, showErrors, error } = elementStates;
		const errorMsg = showErrors ? error : '';

		const { type, ...props } = ownProps;

		const cls = Classnames( style.input, this.props.elementProps.className );

		return (

			<Input { ...props } type={ type } value={ value } error={ errorMsg } { ...elementProps } { ...elementHandlers } className={ cls } />

		)

	}

}

export default ElementTB( InputTB );
