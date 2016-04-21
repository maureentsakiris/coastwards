import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class FormSubmit extends Component {

	static displayName = 'FormSubmit';

	static propTypes = {

		// Passed on from Form
		form: PropTypes.string,
		formIsValid: PropTypes.bool,
		submitting: PropTypes.bool,

		children: PropTypes.node,
		type: function ( props, propName ) {

			if ( props[ propName ] ) {

				return new Error( 'This is a submit button. Use `FormButton` for other types.' );

			}

		},
		className: function ( props, propName ) {

			if ( props[ propName ] ) {

				return new Error( 'You have passed a classname in FormSubmit. Use button tag in CSS instead.' );

			}

		}

	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { formIsValid, submitting, ...props } = this.props;

		const classNames = classnames( {

			'mdl-button': true,
			'mdl-js-button': true,
			'mdl-button--raised': true,
			'mdl-js-ripple-effect': true,
			'mdl-button--accent': true,
			'form-submit': true,
			'form-is-not-valid': !formIsValid

		} );

		return (

			<button {...props} type="submit"  className={ classNames } disabled={ submitting || !formIsValid }>
				{this.props.children}
			</button>

		)

	}

}
