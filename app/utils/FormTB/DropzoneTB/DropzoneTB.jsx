import React, { Component, PropTypes } from 'react';
import Classnames from 'classnames';
import { ElementTB } from '../ElementTB/ElementTB';
import _ from 'underscore';
import accepts from 'attr-accept';
import { Button } from 'react-toolbox/lib/button';
import DropzoneTBFile from './DropzoneTBFile';
import DropzoneTBZone from './DropzoneTBZone';

import style from './_styleDropzoneTB';


class DropzoneTB extends Component {

	static propTypes = {

		elementHandlers: PropTypes.object.isRequired,
		elementProps: PropTypes.object.isRequired,
		elementStates: PropTypes.object.isRequired,

		accept: PropTypes.string,
		warning_accept: PropTypes.string,
		multiple: PropTypes.bool,
		disablePreview: PropTypes.bool,
		max: PropTypes.number,
		warning_max: PropTypes.string,
		fileValidations: PropTypes.array,
		promptDnD: PropTypes.string,
		promptClick: PropTypes.string

	};

	static defaultProps = {

		accept: 'image/*',
		warning_accept: 'Some of the files you dropped are not the right filetype and will be ignored.',
		multiple: true,
		disablePreview: false,
		max: 10,
		warning_max: 'Slow down cowboy, you have reached the maximum number of uploads.',
		promptDnD: 'Drag & drop your files anywhere on the page or click here',
		promptClick: 'Click here to select your files'

	};

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

		const { elementProps, elementStates, ...ownProps } = this.props;

		const { className } = elementProps;
		const { showError, errorMsg, submitting/*, elementIsValid*/ } = elementStates;		
		const { promptDnD, promptClick, accept, multiple, ...dropzoneProps } = ownProps;

		const draganddrop = this.context.draganddrop;
		const prompt = draganddrop ? promptDnD : promptClick;

		const zoneProps = {

			onDrop: this._onDrop.bind( this ),
			onClick: this._openInput.bind( this ),
			prompt: prompt

		}

		const cls = Classnames( style.dropzone, className );
		const clsInput = Classnames( {

			[ style.input ]: draganddrop

		} )


		/*const files = this.state.filesDropped;
		const dropzoneFiles = this._createDropzoneFiles( files );*/

		return (

			<div className={ cls } { ...dropzoneProps } data-dropzone-tb="dropzone" >
				{ draganddrop && ( <DropzoneTBZone { ...zoneProps } /> ) } 
				<input { ...elementProps } accept={ accept } multiple={ multiple } className={ clsInput } type="file" onChange={ this._onDrop.bind( this ) } ref="dropzoneInput" />
				
				<Button icon="file_upload" type="button" floating accent onClick={ this._openInput.bind( this ) } disabled={ submitting } />
				{ showError && ( <span className="mdl-textfield__error">{ errorMsg }</span> ) }
				<div id="DropzoneFiles">
			
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

			return React.createElement( DropzoneTBFile, {

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

export default ElementTB( DropzoneTB );
