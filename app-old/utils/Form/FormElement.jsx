import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';
import Validator from 'validator';


Validator.hasValue = function ( val ){

	return val.length > 0;

}

/*
 * TODO: Error on failed proptype points to FormElementHOC instead of LOC (e.g. Failed propType: Required prop `name` was not specified in `FormElementHOC`. Check the render method of `AnyQuestions`.)
 * 
*/


export var FormElement = ( ComposedComponent ) => class extends Component {

	static displayName = 'FormElementHOC';

	static propTypes = {

		// Passed on from Form ( should be '.isRequired' but throws an error in the initial render cycle and are passed on dynamically anyway )
		register: PropTypes.func,
		unregister: PropTypes.func,
		validateForm: PropTypes.func,
		form: PropTypes.string,
		showError: PropTypes.bool,
		submitting: PropTypes.bool,

		name: PropTypes.string.isRequired,
		label: PropTypes.string,
		value: PropTypes.oneOfType( [ PropTypes.string, PropTypes.object ] ), // Default value, subsequent values are stored as state
		required: PropTypes.bool,
		disabled: PropTypes.bool,
		validations: PropTypes.array,

		// Just some sanitizing
		defaultValue: function ( props, propName ) {

			if ( props[ propName ] ) {

				return new Error( 'Form uses controlled components. Setting defaultValue will have no effect. Set value instead.' );

			}

		},
		className: function ( props, propName ) {

			if ( props[ propName ] ) {

				return new Error( 'Form does not support custom classNames (for now). Use tags in CSS instead.' );

			}

		},
		placeholder: function ( props, propName ) {

			if ( props[ propName ] ) {

				return new Error( 'Form uses material design lite which does not play well with placeholders. They have `floating labels` instead.' );

			}

		}

	};

	static defaultProps = {

		validations: []

	}


	componentWillMount ( ){

		if ( this.props.required ) {

			this.props.validations.unshift( { method: 'hasValue', errorMsg: 'This field is required' } );

		}

		this._validate();
		this.props.register( this );

	}

	componentWillReceiveProps ( props ){

		this.setState( { showError: props.showError, submitting: props.submitting } )

	}

	componenWillUnmount ( ){

		this.props.unregister( this );

	}


	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			value: this.props.value || '',
			showError: this.props.showError,
			submitting: this.props.submitting,
			errorMsg: '',
			elementIsValid: true,
			elementIsFocused: false,
			elementIsDirty: !_.isEmpty( this.props.value ),
			elementIsDisabled: this.props.disabled

		}

	}

	render () {

		const propsNeeded = _.omit( this.props, [ 'register', 'unregister', 'validateForm', 'showError', 'submitting', 'required', 'validations' ] );
		const { form, name, label, placeholder, disabled, ...props } = { ...propsNeeded };

		const elementHandlers = {

			onChange: this._setValue.bind( this ),
			onFocus: this._setFocus.bind( this, true ),
			onBlur: this._setFocus.bind( this, false )

		}

		const elementProps = {

			form: form,
			name: name,
			placeholder: placeholder,
			disabled: disabled

		}

		const labelProps = {

			label: label,
			htmlFor: name

		}

		const elementStates = this.state;

		return (

			<ComposedComponent {...props} elementHandlers={ elementHandlers } elementProps={ elementProps } labelProps={ labelProps } elementStates={ elementStates } />

		)

	}

	_setFocus ( bool ){

		this.setState( { elementIsFocused: bool } );

	}

	_setValue ( e ){
		
		let val;
		
		// Check if we have a basic form element
		if( e.currentTarget ){

			let target = e.currentTarget;
			
			if( target.type == 'checkbox' ){

				val = target.checked ? target.value : '';

			}else{

				val = target.value;

			}

		}else{

			val = e;

		}

		//console.log( "setting value:", val );

		this.setState( {

			value: val,
			elementIsValid: true,
			elementIsDirty: !_.isEmpty( val )

		}, this._validate );

	}

	_validate ( ){


		if( !this.props.validations ){

			return;

		}

		let flag = true;
		let errorMsg = '';

		if( this.state.value || this.props.required ) {

			/*console.log( 'Validating: ', this.props.name );
			console.log( 'Value is:', this.state.value );*/

			_.each( this.props.validations, ( validation ) => {

				if( !Validator[ validation.method ].apply( Validator, [ this.state.value, validation.options ] ) ) {

					flag = false;
					errorMsg = validation.errorMsg;

				}

			} )

		}

		this.setState( { elementIsValid: flag, errorMsg: errorMsg }, this.props.validateForm )

	}

}
