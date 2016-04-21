import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import { FormElement } from './FormElement';

/*
 * NOTE: Hard coded `is-upgraded` class from mdl, `is-focused` does not apply to checkboxes because there is no textfield
*/

class FormCheckbox extends Component {

	static propTypes = {

		elementHandlers: PropTypes.object.isRequired,
		elementProps: PropTypes.object.isRequired,
		labelProps: PropTypes.object.isRequired,
		elementStates: PropTypes.object.isRequired,

		options: PropTypes.shape( {

			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired

		} ),
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

		const { elementHandlers, elementProps, labelProps, elementStates, ...ownProps } = this.props;

		const { label, htmlFor } = labelProps;
		const { value, showError, errorMsg, elementIsValid, elementIsDisabled } = elementStates;
		const { onChange } = elementHandlers;

		const { options, ...props } = ownProps;

		const cls = Classnames( 'mdl-textfield mdl-textfield--floating-label is-dirty', {

			'is-invalid': !elementIsValid,
			'is-disabled': elementIsDisabled

		} )

		const clsCheck = Classnames( 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect is-upgraded' )

		const flag = value ? true : false;

		return (

			<div className={ cls }>
				<label className="mdl-textfield__label" htmlFor={ htmlFor }>{ label }</label>
				<label className={ clsCheck } htmlFor={ htmlFor }>
					<input { ...props } { ...elementProps } onClick={ onChange } id={ htmlFor } type="checkbox" className="mdl-checkbox__input" value={ options.value } defaultChecked={ flag } />
					<span className="mdl-checkbox__label">{ options.label }</span>
				</label>
				{ showError && ( <span className="mdl-textfield__error">{ errorMsg }</span> ) }
			</div>

		)

	}

}

export default FormElement( FormCheckbox );
