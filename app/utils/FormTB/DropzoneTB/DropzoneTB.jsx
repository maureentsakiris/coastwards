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

		showSnackbar: PropTypes.func

	}

	componentWillUpdate ( p, s ){

		if( p.elementProps.reset != this.props.elementProps.reset ){

			this._resetDropzone();

		}

	}

	constructor ( props ) {

		super ( props );

		this.dropsValidated = [];
		this.validDrops = [];

		this.state = {

			filesDropped: [],
			validating: false

		}

	}

	render () {

		const { elementHandlers, elementProps, elementStates, ...ownProps } = this.props; // eslint-disable-line no-unused-vars
		const { form, name, label, disabled, className } = elementProps; // eslint-disable-line no-unused-vars
		const { value, showErrors, error, submitting, elementIsValid } = elementStates;	// eslint-disable-line no-unused-vars	
		const { accept, multiple, disablePreview, max, warning_max, warning_accept, fileValidations, zoneProps, listProps, onValidDrop, ...restProps } = ownProps; // eslint-disable-line no-unused-vars

		const { validating } = this.state;


		const isBlocked = validating || submitting || disabled;

		const cls = Classnames( style.dropzone, className );

		const zonePropsExtended = _.extend( zoneProps, {

			onDragEnter: this._onDragEnter.bind( this ),
			onDragLeave: this._onDragLeave.bind( this ),
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

		if( isValidDrop ){

			let drop = _.extend( comp.props.file, comp.state.validations );
			this.validDrops = this.validDrops.concat( [ drop ] );
			onValidDrop( status, comp );

		}else{

			onInValidDrop( status, comp );

		}

		let { filesDropped } = this.state;
		this.dropsValidated = this.dropsValidated.concat( [ comp.props.file ] );
		let allDropsValidated = _.chain( filesDropped ).difference( this.dropsValidated ).size().value() === 0 ? true : false;

		if( allDropsValidated ){

			elementHandlers.onChange( this.validDrops );
			onDropsValidated( this.validDrops );
			this.setState( { validating: false } );

			if( !this.validDrops.length ){

				this._resetDropzone();

			}

		}

	}

	_resetDropzone (){

		console.log( "resetting dropup" );

		this.dropsValidated = [];
		this.validDrops = [];

		this.setState( { 

			validating: false,
			filesDropped: []

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

					validating: true,
					filesDropped: _.extend( state.filesDropped, allFiles )

				} 

			}, this.props.onDropsAccepted( allFiles ) );

		}/*else{

			this.setState( { validating: false } );

		}*/

	}

	_openInput ( ){

		this.refs.dropzoneInput.click();

	}

}

export default ElementTB( DropzoneTB );
