import React, { Component, PropTypes } from 'react';
import Classnames from 'classnames';
import { ElementTB } from '../ElementTB/ElementTB';
import _ from 'underscore';
import accepts from 'attr-accept';
import DropzoneTBFile from './DropzoneTBFile';
import DropzoneTBZone from './DropzoneTBZone';

import style from './_styleDropzoneTB';

/*
 * TODO: Files added should not validate twice (Not needed for coastwards) See: _createDropZoneFiles
*/ 

class DropzoneTB extends Component {

	static propTypes = {

		elementHandlers: PropTypes.object.isRequired,
		elementProps: PropTypes.object.isRequired,
		elementStates: PropTypes.object.isRequired,

		accept: PropTypes.string,
		multiple: PropTypes.bool,
		disablePreview: PropTypes.bool,
		max: PropTypes.number,
		warning_max: PropTypes.string,
		warning_accept: PropTypes.string,
		fileValidations: PropTypes.array,

		zoneProps: PropTypes.shape( {

			showRippler: PropTypes.bool,
			showPrompt: PropTypes.bool,
			clsZone: PropTypes.string,
			clsZoneEnter: PropTypes.string,
			clsZoneDrop: PropTypes.string,
			clsZoneBlocked: PropTypes.string,
			promptDrag: PropTypes.string,
			promptDrop: PropTypes.string,
			promptClick: PropTypes.string

		} ),

		listProps: PropTypes.shape( {

		} ),

		onDropsAccepted: PropTypes.func,
		onTestDone: PropTypes.func,
		onValidDrop: PropTypes.func,
		onInValidDrop: PropTypes.func,
		onDropsValidated: PropTypes.func

	};

	static defaultProps = {

		accept: 'image/*',
		multiple: true,
		disablePreview: false,
		max: 10,
		warning_max: 'Slow down cowboy, you have reached the maximum number of uploads.',
		warning_accept: 'Some of the files you dropped are not the right filetype and will be ignored.',
		fileValidations: [],

		zoneProps: {}, 

		listProps: {},

		onDropsAccepted: () => {},
		onTestDone: () => {},
		onValidDrop: () => {},
		onInValidDrop: () => {},
		onDropsValidated: () => {}

	};

	static contextTypes = {

		showSnackbar: PropTypes.func,
		logError: PropTypes.func

	}

	componentWillUpdate ( p ){

		if( p.elementProps.reset != this.props.elementProps.reset ){

			this._resetDropzone();

		}

	}

	constructor ( props ) {

		super ( props );

		this.validDrops = [];
		this.invalidDrops = [];

		this.state = {

			filesDropped: [],
			validating: false

		}

	}

	render () {

		const { elementHandlers, elementProps, elementStates, ...ownProps } = this.props; // eslint-disable-line no-unused-vars
		const { form, name, label, disabled, className } = elementProps; // eslint-disable-line no-unused-vars
		const { value, showErrors, error, submitting, elementIsValid } = elementStates;	// eslint-disable-line no-unused-vars	
		const { accept, multiple, disablePreview, max, warning_max, warning_accept, fileValidations, zoneProps, listProps, onDropsAccepted, onTestDone, onValidDrop, onInValidDrop, onDropsValidated, ...restProps } = ownProps; // eslint-disable-line no-unused-vars

		const { validating } = this.state;


		const isBlocked = validating || submitting || disabled;

		const cls = Classnames( style.dropzone, className );

		const zonePropsExtended = _.extend( zoneProps, {

			/*onDragEnter: this._onDragEnter.bind( this ),
			onDragLeave: this._onDragLeave.bind( this ),*/
			onDrop: this._onDrop.bind( this ),
			onClick: this._openInput.bind( this ),
			isBlocked: isBlocked

		} );


		const listPropsExtended = _.extend( listProps, {

		} );
		

		const files = this.state.filesDropped;
		const droppedFiles = this._createDropzoneFiles( files );

		return (

			<div { ...restProps } className={ cls } data-selector="dropzone">
				<DropzoneTBZone { ...zonePropsExtended } />
				<input accept={ accept } multiple={ multiple } className={ style.input } type="file" onChange={ this._onDrop.bind( this ) } ref="dropzoneInput" />
				<div { ...listPropsExtended }>
					{ droppedFiles }
				</div>
			</div>

		)

	}


	// RENDER FUNCTIONS

	_createDropzoneFiles ( files ) {

		return _.map( files, ( file, index ) => {

			return React.createElement( DropzoneTBFile, {

				key: index, 
				file: file,
				accept: this.props.accept, 
				validations: this.props.fileValidations,
				onTestDone: this._onFileTestDone.bind( this ),
				onValidationDone: this._onFileValidationDone.bind( this )

			} );

		} );

	}

	_onFileTestDone ( comp, message, passed, result, test ){

		this.props.onTestDone( comp, message, passed, result, test );

	}

	_onFileValidationDone ( isValidDrop, status, comp ){

		let { onValidDrop, onInValidDrop, onDropsValidated, elementHandlers } = this.props;

		let exifdata = comp.props.file.exifdata;
		let validations = comp.state.validations;

		let file = comp.props.file;
		let drop = {

			file: file,
			exifJSON: JSON.stringify( exifdata ),
			validationsJSON: JSON.stringify( validations ),
			validations: validations,
			manual: 0,
			exifDateTime: exifdata.DateTimeOriginal || exifdata.DateTimeDigitized || exifdata.DateTime

		}

		if( isValidDrop ){

			this.validDrops = this.validDrops.concat( [ drop ] );
			onValidDrop( status, comp );

		}else{

			this.invalidDrops = this.invalidDrops.concat( [ drop ] );
			onInValidDrop( status, comp );

		}

		let { filesDropped } = this.state;
		let dropsValidated = this.validDrops.length + this.invalidDrops.length;

		if( filesDropped.length === dropsValidated ){

			elementHandlers.onChange( this.validDrops );
			onDropsValidated( this.validDrops, this.invalidDrops );

			this.setState( { validating: false } );

			if( !this.validDrops.length ){

				this._resetDropzone();

			}

		}

	}


	// INTERACTION

	_promiseDroppedFiles ( e ){

		return new Promise( ( resolve, reject ) => {

			const droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.currentTarget.files;

			if( droppedFiles.length > 0 ){

				resolve( droppedFiles );

			}else{

				reject( Error( 'DropzoneTB/_promiseDroppedFiles/droppedFiles.length = 0' ) );

			}

		} );

	}

	_promiseAccepted = ( droppedFiles ) => {

		return new Promise( ( resolve, reject ) => {

			let acceptedFiles = [];
			let unacceptedFiles = [];

			_.each( droppedFiles, ( file ) => {

				if( !this.props.disablePreview ) {

					file.preview = window.URL.createObjectURL( file );

				}

				let accepted = accepts( file, this.props.accept  ) ? true : false;

				if( !accepted ){

					unacceptedFiles.push( file );

				}else{

					acceptedFiles.push( file );

				}

			} )

			if( unacceptedFiles.length > 0 ){

				this.context.showSnackbar( { label: this.props.warning_accept } );

			}

			if( !acceptedFiles.length ){

				reject( Error( 'DropzoneTB/_promiseAccepted/None of the dropped files were accepted' ) );

			}

			resolve( acceptedFiles );

		} );

	}

	_promiseMax = ( acceptedFiles ) => {

		let maxFiles = _.union( this.state.filesDropped, acceptedFiles );

		if( maxFiles.length > this.props.max ) {

			maxFiles.splice( this.props.max );
			this.context.showSnackbar( { label: this.props.warning_max } );

		}

		return Promise.resolve( maxFiles );

	}

	_promiseValidation = ( allFiles ) => {

		this.setState( {

			validating: true,
			filesDropped: allFiles

		}, this.props.onDropsAccepted( allFiles ) );

		return Promise.resolve( allFiles );

		// --> triggeres render + _createDropZoneFiles/validation

	}

	_onDrop ( e ) {

		this._promiseDroppedFiles( e )
		.then( this._promiseAccepted )
		.then( this._promiseMax )
		.then( this._promiseValidation )
		.catch( ( err ) => {

			this.context.logError( err );

		} );	

	}


	// OTHER

	_resetDropzone (){

		this.validDrops = [];
		this.invalidDrops = [];

		this.setState( { 

			validating: false,
			filesDropped: []

		} );

	}

	_openInput ( ){

		this.refs.dropzoneInput.click();

	}

}

export default ElementTB( DropzoneTB );
