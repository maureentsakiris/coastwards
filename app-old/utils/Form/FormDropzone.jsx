import React, { Component, PropTypes } from 'react';
import Classnames from 'classnames';
import { FormElement } from './FormElement';
import _ from 'underscore';
import util from 'util';
import accepts from 'attr-accept';
import Button from '../MDL/Button';
import FormDropzoneFile from './FormDropzoneFile';
import FormDropzoneZone from './FormDropzoneZone';

class FormDropzone extends Component {

	static propTypes = {

		elementHandlers: PropTypes.object.isRequired,
		elementProps: PropTypes.object.isRequired,
		labelProps: PropTypes.object.isRequired,
		elementStates: PropTypes.object.isRequired,

		accept: PropTypes.string,
		warning_accept: PropTypes.string,
		multiple: PropTypes.bool,
		disablePreview: PropTypes.bool,
		max: PropTypes.number,
		warning_max: PropTypes.string,
		fileValidations: PropTypes.array,

		promptDnD: PropTypes.string,
		prompt: PropTypes.string

	};

	static defaultProps = {

		accept: 'image/*',
		warning_accept: 'Some of the files you dropped are not the right filetype and will be ignored. Accepted filetypes are: %s',
		multiple: true,
		disablePreview: false,
		max: 10,
		warning_max: 'Slow down cowboy, you can only upload %s images at once. (But you can repeat the process as many times as you like ;)',
		promptDnD: 'Drag & drop your files anywhere on the page or click here',
		promptClick: 'Click here to select your files'

	}

	static contextTypes = {

		showSnackbar: PropTypes.func,
		onDragLeave: PropTypes.func,
		draganddrop: PropTypes.bool

	}


	constructor ( props ) {

		super ( props );

		this.state = {

			value: [],
			filesDropped: []

		}

	}

	render () {

		const propsNeeded = _.omit( this.props, [ 'elementHandlers', 'labelProps' ] );
		const { elementProps, elementStates, ...ownProps } = propsNeeded;

		const { showError, errorMsg, submitting, elementIsValid, elementIsFocused, elementIsDisabled } = elementStates;		
		const { promptDnD, promptClick, accept, multiple, ...dropzoneProps } = ownProps;

		const zoneProps = {

			onDrop: this._onDrop.bind( this )

		}

		const cls = Classnames( 'dropzone pad-tb', {

			'is-focused': elementIsFocused, 
			'is-invalid': !elementIsValid,
			'is-disabled': elementIsDisabled

		} )

		const draganddrop = this.context.draganddrop;
		const prompt = draganddrop ? promptDnD : promptClick;

		const files = this.state.filesDropped;
		const dropzoneFiles = this._createDropzoneFiles( files );

		return (

			<div className={ cls } { ...dropzoneProps } >
				{ draganddrop && ( <FormDropzoneZone { ...zoneProps } /> ) } 
				<input { ...elementProps } accept={ accept } multiple={ multiple } style={ { display: 'none' } } type="file" onChange={ this._onDrop.bind( this ) } ref="dropzoneInput" />
				
				<Button type="button" fab={ true } accent={ true } ripple={ true } onClick={ this._openInput.bind( this ) } disabled={ submitting }>
					<i className="material-icons">&#xE2C6;</i>
				</Button>
				{ showError && ( <span className="mdl-textfield__error">{ errorMsg }</span> ) }
				<div id="DropzoneFiles">
					{ dropzoneFiles }
				</div>
			</div>

		)

	}

	_onValidationDone ( comp, isValidDrop ){

		if( isValidDrop ){

			let drop = _.extend( comp.props.file, comp.state.validations );
			let validFiles = this.state.value.concat( [ drop ] );
			
			this.setState( { value: validFiles }, this.props.elementHandlers.onChange( validFiles ) )

		}

	}

	_createDropzoneFiles ( files ) {

		return _.map( files, ( file, index ) => {

			return React.createElement( FormDropzoneFile, {

				key: index, 
				file: file,
				accept: this.props.accept, 
				validations: this.props.fileValidations,
				onValidationDone: this._onValidationDone.bind( this )

			} );

		} );

	}

	_onDrop ( e ) {

		const droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.currentTarget.files;
		let files = [];

		_.each( droppedFiles, ( file ) => {

			if( !this.props.disablePreview ) {

				file.preview = window.URL.createObjectURL( file );

			}

			let accepted = accepts( file, this.props.accept  ) ? true : false;
		
			if( !accepted ){

				this.context.showSnackbar( this.props.warning_accept );

			}else{

				files.push( file );

			}

		} )

		let allFiles = _.union( this.state.filesDropped, files );

		if( allFiles.length > this.props.max ) {

			allFiles.splice( this.props.max );
			this.context.showSnackbar( util.format( this.props.warning_max, this.props.max ) );

		}


		this.setState( ( state ) => {

			return { 

				filesDropped: _.extend( state.filesDropped, allFiles )

			} 

		} );

	}

	_openInput ( ){

		this.refs.dropzoneInput.click();

	}

}

export default FormElement( FormDropzone );
