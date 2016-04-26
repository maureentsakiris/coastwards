import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Button } from 'react-toolbox/lib/button';

export default class SubmitTB extends Component {

	static displayName = 'SubmitTB';

	static propTypes = {

		// Passed on from Form
		form: PropTypes.string,
		formIsValid: PropTypes.bool,
		submitting: PropTypes.bool,

		disabled: PropTypes.bool,

		type: function ( props, propName ) {

			if ( props[ propName ] ) {

				return new Error( 'This is a submit button. Use `Button` for other types.' );

			}

		}

	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { formIsValid, submitting, ...props } = this.props;

		return (

			<Button {...props} type="submit" disabled={ submitting || !formIsValid } />

		)

	}

}
