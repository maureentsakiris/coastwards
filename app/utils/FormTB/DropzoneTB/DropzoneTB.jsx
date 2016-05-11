import React, { Component, PropTypes } from 'react';
import Classnames from 'classnames';
import { ElementTB } from '../ElementTB/ElementTB';
import _ from 'underscore';
import accepts from 'attr-accept';
import DropzoneTBFile from './DropzoneTBFile';
import DropzoneTBZone from './DropzoneTBZone';

import style from './_styleDropzoneTB';

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
			promptClick: PropTypes.string,
			promptProcessing: PropTypes.string

		} ),

		listProps: PropTypes.shape( {

		} )

	};

	static defaultProps = {

		accept: 'image/*',
		multiple: true,
		disablePreview: false,
		max: 10,
		warning_max: 'Slow down cowboy, you have reached the maximum number of uploads.',
		warning_accept: 'Some of the files you dropped are not the right filetype and will be ignored.',
		fileValidations: [],
		openInput: false,
		zoneProps: {}, 
		listProps: {}

	};

	static contextTypes = {

		showSnackbar: PropTypes.func

	}

	constructor ( props ) {

		super ( props );

		this.state = {

			value: [],
			filesDropped: [],
			blockDropzone: false

		}

	}

	render () {

		const { elementHandlers, elementProps, elementStates, ...ownProps } = this.props; // eslint-disable-line no-unused-vars
		const { form, name, label, disabled, className } = elementProps; // eslint-disable-line no-unused-vars
		const { value, showErrors, error, submitting, elementIsValid } = elementStates;	// eslint-disable-line no-unused-vars	
		const { accept, multiple, disablePreview, max, warning_max, warning_accept, fileValidations, zoneProps, listProps, ...restProps } = ownProps; // eslint-disable-line no-unused-vars

		const { blockDropzone } = this.state;

		const cls = Classnames( style.dropzone, className );

		const zonePropsExtended = _.extend( zoneProps, {

			onDragEnter: this._onDragEnter.bind( this ),
			onDragLeave: this._onDragLeave.bind( this ),
			onDrop: this._onDrop.bind( this ),
			onClick: this._openInput.bind( this ),
			isBlocked: blockDropzone

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


	_onValidationsDone ( comp, isValidDrop ){

		if( isValidDrop ){

			let drop = _.extend( comp.props.file, comp.state.validations );
			let validFiles = this.state.value.concat( [ drop ] );
			
			this.setState( { value: validFiles }, this.props.elementHandlers.onChange( validFiles ) )

		}

	}

	_createDropzoneFiles ( files ) {

		return _.map( files, ( file, index ) => {

			return React.createElement( DropzoneTBFile, {

				key: index, 
				file: file,
				accept: this.props.accept, 
				validations: this.props.fileValidations,
				onValidationDone: this._setPrompt,
				onValidationsDone: this._onValidationsDone.bind( this )

			} );

		} );

	}

	_onDragEnter (  ){

	}

	_onDragLeave (  ){

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

				this.context.showSnackbar( { label: this.props.warning_accept } );

			}else{

				files.push( file );

			}

		} )

		let allFiles = _.union( this.state.filesDropped, files );

		if( allFiles.length > this.props.max ) {

			allFiles.splice( this.props.max );
			this.context.showSnackbar( { label: this.props.warning_max } );

		}

		if( allFiles.length > 0 ){

			this.setState( ( state ) => {

				return { 

					blockDropzone: true,
					filesDropped: _.extend( state.filesDropped, allFiles )

				} 

			} );

		}else{

			this.setState( { blockDropzone: false } );

		}

	}

	_openInput ( ){

		this.refs.dropzoneInput.click();

	}

}

export default ElementTB( DropzoneTB );
