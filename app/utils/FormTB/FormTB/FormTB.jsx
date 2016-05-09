import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';
/*import http from 'http';*/
import Classnames from 'classnames';

import style from './_styleFormTB';

/*
 * TODO: Pass (not hardcode) contextTypes to get access to global functions (is that possible?) 
 * FORM ELEMENTS STILL TO BE IMPLEMENTED: <output>, <fieldset> and <legend>
*/

export default class FormTB extends Component {

	static propTypes = {

		name: PropTypes.string.isRequired,
		autocomplete: PropTypes.oneOf( [ 'on', 'off' ] ),
		noValidate: PropTypes.bool,
		className: PropTypes.string,
		children: PropTypes.node

	};

	static defaultProps = {

		autocomplete: 'off',
		noValidate: true

	};

	static contextTypes = {

		showLoader: PropTypes.func
		
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
			showErrors: false

		}

	}

	render () {

		const { name, autocomplete, className, noValidate } = this.props;
		const children = this._cloneWithMethods( this.props.children ); 
		const cls = Classnames( style.form, className );

		return (

			<form {...this.props} onSubmit={ this._submit.bind( this ) } id={ name } autoComplete={ autocomplete } className={ cls } noValidate={ noValidate }>
				{ children }
			</form>

		)

	}

	_validateForm ( ){

		let flag = true;
		let elements = this.elements;

		_.each( elements, ( element ) => {

			if ( !element.state.elementIsValid ) {

				flag = false;

			}

		} );

		this.setState( { formIsValid: flag } );

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

			this.model[ name ] = this.elements[ name ].state.value;

		} );

	}

	_submit ( e ){

		e.preventDefault();
		this.setState( { submitting: true, showErrors: true } );
		this.context.showLoader( true );
		this._updateModel();


		/*console.log( 'Form is valid:', this.state.formIsValid );
		console.log( "model", this.model );*/

		/*let options = {
  
			hostname: '134.245.149.30',
			port: 8888,
			path: '/',
			method: 'POST',
			headers: {
				
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': this.model.length

			}
		};

		let req = http.request( options, ( res ) => {

			console.log( `STATUS: ${res.statusCode}` );
			//console.log( `HEADERS: ${JSON.stringify( res.headers )}` );

			//res.setEncoding( 'utf8' );

			res.on( 'data', ( chunk ) => { 

				console.log( `BODY: ${ chunk }` );

			} );

			res.on( 'end', () => {

				console.log( 'No more data in response.' )

			} )

		} );*/

		/*req.on( 'error', ( e ) => {

			console.log( `problem with request: ${e.message}` );

		} );

		// write data to request body
		req.write( this.model );
		req.end();*/

	}

}

