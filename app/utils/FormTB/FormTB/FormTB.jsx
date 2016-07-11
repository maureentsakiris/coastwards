import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';
import Classnames from 'classnames';
import formData from './FormData.js';
import request from '../../Request';

import style from './_styleFormTB';

/*
 * TODO: Pass (not hardcode) contextTypes to get access to global functions (is that possible?) 
 * FORM ELEMENTS STILL TO BE IMPLEMENTED: <output>, <fieldset> and <legend>
*/

export default class FormTB extends Component {

	static propTypes = {

		className: PropTypes.string,

		name: PropTypes.string.isRequired,
		autocomplete: PropTypes.oneOf( [ 'on', 'off' ] ),
		noValidate: PropTypes.bool,
		autoSubmit: PropTypes.bool,
		onReset: PropTypes.func,
		onSubmitProgress: PropTypes.func,
		onSubmitError: PropTypes.func,
		onSubmitDone: PropTypes.func,
		children: PropTypes.node

	};

	static defaultProps = {

		autocomplete: 'off',
		noValidate: true,
		autoSubmit: false,
		onReset: () => {}

	};

	static contextTypes = {

		showLoader: PropTypes.func,
		logError: PropTypes.func, 
		showSnackbar: PropTypes.func
		
	}

	componentWillMount ( ){

		this.elements = {};
		this.model = {};

	}

	componentDidMount ( ){

		this._validateForm();

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			submitting: false,
			formIsValid: true,
			showErrors: false,
			reset: false

		}

	}

	render () {

		const { className, name, autocomplete, noValidate, autoSubmit, onReset, onSubmitProgress, onSubmitError, onSubmitDone, children, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		const elements = this._cloneWithMethods( children ); 
		const cls = Classnames( style.form, className );

		return (

			<form { ...restProps } onSubmit={ this._submit.bind( this ) } autoComplete={ autocomplete } className={ cls } noValidate={ noValidate } ref="form" >
				{ elements }
			</form>

		)

	}

	_validateForm ( ){

		let { autoSubmit } = this.props;
		let flag = true;
		let elements = this.elements;

		_.each( elements, ( element ) => {

			if ( !element.state.elementIsValid ) {

				flag = false;

			}

		} );

		if( autoSubmit && flag ){

			this.setState( { formIsValid: flag }, this._submit );

		}else{

			this.setState( { formIsValid: flag } );

		}

	}

	_cloneWithMethods ( children ){

		return React.Children.map( children, ( child ) => {

			let props = { };

			if( React.isValidElement( child ) ){

				if( child.type.displayName == 'ElementTBHOC' ){

					props.register = this._register.bind( this );
					props.unregister = this._unregister.bind( this );
					props.validateForm = this._validateForm.bind( this );
					props.form  = this.props.name;
					props.showErrors = this.state.showErrors;
					props.submitting = this.state.submitting;
					props.reset = this.state.reset;

				}

				if( child.type.displayName == 'SubmitTB' ){

					props.form  = this.props.name;
					props.formIsValid = this.state.formIsValid;
					props.submitting = this.state.submitting;

				}

				props.children = this._cloneWithMethods( child.props.children );
				return React.cloneElement( child, props );

			}else{

				return child;

			}

		} )

	}

	_register ( element ){

		this.elements[ element.props.name ] = element;

	}

	_unregister ( element ){

		delete this.elements[ element.props.name ];

	}

	_updateModel ( ){

		_.each( this.elements, ( element, name ) => {

			/*console.log( name );
			console.log( this.elements[ name ].state.value );*/
			this.model[ name ] = this.elements[ name ].state.value;

		} );

	}

	_resetForm ( ){

		this.model = {};

		this.refs.form.reset();

		this.setState( { 

			submitting: false,
			formIsValid: true,
			showErrors: false,
			reset: true

		}, this._onReset );

		this.context.showLoader( false );

	}

	_onReset ( ){

		this.setState( { reset: false } );
		this.props.onReset();

	}

	_submit ( e ){

		if( e ){

			e.preventDefault();

		}
		
		this.setState( { submitting: true, showErrors: true } );
		this.context.showLoader( true );
		this._updateModel();

		//console.log( 'Form is valid:', this.state.formIsValid );

		//console.log( this.model );

		let form = formData.fromObj( this.model );

		let requestOptions = {

			toSend: form,
			path: '/contributions/upload',
			onRequestProgress: this.props.onSubmitProgress

		}

		request.promiseXHR( requestOptions )
			.then( ( response ) => {

				this.props.onSubmitDone( response, this.model );
				this._resetForm();
				return response;
				

			} )
			.catch( ( err ) => {

				this.props.onSubmitError( err );
				this.context.logError( err );
				this.context.showLoader( false );

			} );

	}

}

