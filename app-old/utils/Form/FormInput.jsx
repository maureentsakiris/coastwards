import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import { FormElement } from './FormElement';

class FormInput extends Component {

	static propTypes = {

		elementHandlers: PropTypes.object.isRequired,
		elementProps: PropTypes.object.isRequired,
		labelProps: PropTypes.object.isRequired,
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

		const { elementHandlers, elementProps, labelProps, elementStates, ...ownProps } = this.props;
		
		const { label, htmlFor } = labelProps;
		const { value, showError, errorMsg, elementIsValid, elementIsFocused, elementIsDirty, elementIsDisabled } = elementStates;

		const { type, ...props } = ownProps;

		const cls = Classnames( 'mdl-textfield mdl-textfield--floating-label', {

			'is-focused': elementIsFocused,
			'is-dirty': elementIsDirty,
			'is-invalid': !elementIsValid,
			'is-disabled': elementIsDisabled

		} )

		return (

			<div className={ cls }>
				<input { ...props } className="mdl-textfield__input" type={ type } value={ value } { ...elementProps } { ...elementHandlers } />
				<label className="mdl-textfield__label" htmlFor={ htmlFor }>{ label }</label>
				{ showError && ( <span className="mdl-textfield__error">{ errorMsg }</span> ) }
			</div>

		)

	}

}

export default FormElement( FormInput );
