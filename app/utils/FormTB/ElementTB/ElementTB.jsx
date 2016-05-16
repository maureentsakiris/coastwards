import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';
import Validator from 'validator';


Validator.hasValue = function ( val ){

	return val.length > 0;

}

/*
 * TODO: Error on failed proptype points to ElementTBHOC instead of LOC (e.g. Failed propType: Required prop `name` was not specified in `ElementTBHOC`. Check the render method of `AnyQuestions`.)
 * 
*/


export var ElementTB = ( ComposedComponent ) => class extends Component {

	static displayName = 'ElementTBHOC';

	static propTypes = {

		// Passed on from Form ( should be '.isRequired' but throws an error in the initial render cycle and are passed on dynamically anyway ) and are handled here in the ElementTBHOC
		register: PropTypes.func,
		unregister: PropTypes.func,
		validateForm: PropTypes.func,
		showErrors: PropTypes.bool,
		submitting: PropTypes.bool,
		reset: PropTypes.bool,

		// Passed on from instance and is handled here in the ElementTBHOC
		required: PropTypes.bool,
		validations: PropTypes.array,

		// Passed on as prop from instance, converted to state in ElementTBHOC and passes through to ComposedComponent as state
		value: PropTypes.oneOfType( [ PropTypes.string, PropTypes.object ] ), // Default value, subsequent values are stored as state

		// Passed on from Form and passes through to ComposedComponent
		form: PropTypes.string,

		// Passed on from instance and passes through to ComposedComponent
		name: PropTypes.string.isRequired,
		label: PropTypes.string,
		disabled: PropTypes.bool,
		className: PropTypes.string,

		// Just some sanitizing
		defaultValue: function ( props, propName ) {

			if ( props[ propName ] ) {

				return new Error( 'Form uses controlled components. Setting defaultValue will have no effect. Set value instead.' );

			}

		},
		placeholder: function ( props, propName ) {

			if ( props[ propName ] ) {

				return new Error( 'Form uses material design lite which uses floating labels, ... so set label instead.' );

			}

		}

	};

	static defaultProps = {

		validations: []

	}


	componentWillMount ( ){

		if ( this.props.required ) {

			this.props.validations.unshift( { method: 'hasValue', error: 'This field is required' } );

		}

		this._validate();
		this.props.register( this );

	}

	componentWillReceiveProps ( props ){

		this.setState( { showErrors: props.showErrors, submitting: props.submitting } )

	}

	componenWillUnmount ( ){

		this.props.unregister( this );

	}


	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			value: this.props.value || '',
			showErrors: this.props.showErrors,
			error: '',
			submitting: this.props.submitting,
			elementIsValid: true

		}

	}

	render () {

		const propsNeeded = _.omit( this.props, [ 'register', 'unregister', 'validateForm', 'showErrors', 'submitting', 'required', 'validations', 'value' ] );
		const { form, name, label, disabled, className, reset, ...props } = { ...propsNeeded };

		const elementHandlers = {

			onChange: this._setValue.bind( this )

		}

		const elementProps = {

			form: form,
			name: name,
			label: label,
			disabled: disabled,
			className: className,
			reset: reset

		}

		const elementStates = this.state;

		return (

			<ComposedComponent {...props} elementHandlers={ elementHandlers } elementProps={ elementProps } elementStates={ elementStates } ref="element" />

		)

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

		/*console.log( "setting value:", val );*/

		this.setState( {

			value: val,
			elementIsValid: true

		}, this._validate );

	}

	_validate ( ){

		if( !this.props.validations ){

			return;

		}

		let flag = true;
		let error = '';

		if( this.state.value || this.props.required ) {

			/*console.log( 'Validating: ', this.props.name );
			console.log( 'Value is:', this.state.value );*/

			_.each( this.props.validations, ( validation ) => {

				if( !Validator[ validation.method ].apply( Validator, [ this.state.value, validation.options ] ) ) {

					flag = false;
					error = validation.error;

				}

			} )

		}

		/*console.log( 'Element is valid: ', flag );*/

		this.setState( { elementIsValid: flag, error: error }, this.props.validateForm )

	}

}
