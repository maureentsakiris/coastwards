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

		promptDrag: PropTypes.string,
		promptDrop: PropTypes.string,
		promptClick: PropTypes.string,
		promptBlocked: PropTypes.string

	};

	static defaultProps = {

		accept: 'image/*',
		warning_accept: 'Some of the files you dropped are not the right filetype and will be ignored.',
		multiple: true,
		disablePreview: false,
		max: 10,
		warning_max: 'Slow down cowboy, you have reached the maximum number of uploads.'

	};

	static contextTypes = {

		showSnackbar: PropTypes.func,
		draganddrop: PropTypes.bool

	}

	componentWillMount (){

		let { promptDrag, promptClick } = this.props;
		let prompt = this.context.draganddrop ? promptDrag : promptClick;

		this.setState( { promptInit: prompt, prompt: prompt } );

	}


	constructor ( props ) {

		super ( props );

		this.state = {

			promptInit: '',
			prompt: '',
			value: [],
			filesDropped: [],
			blockDropzone: false

		}

	}

	render () {

		const { elementProps, elementStates, ...ownProps } = this.props;
		const { blockDropzone, prompt } = this.state;

		const { className } = elementProps;
		const { /*showError, errorMsg,*/ submitting/*, elementIsValid*/ } = elementStates;		
		const { accept, multiple, ...dropzoneProps } = ownProps;

		const zoneProps = {

			onDrop: this._onDrop.bind( this ),
			onDragEnter: this._onDragEnter.bind( this ),
			onDragLeave: this._onDragLeave.bind( this ),
			onClick: this._openInput.bind( this ),
			blocked: blockDropzone

		}

		const cls = Classnames( style.dropzone, className );
		const clsButton = Classnames( style.uploadBtn, {

			[ style.hidden ]: submitting || blockDropzone

		} )
		/*const clsFiles = Classnames( style.files, {

			[ style.processing ]: blockDropzone

		} );*/
	/*{ showError && ( <span className="mdl-textfield__error">{ errorMsg }</span> ) }
				<div id="DropzoneFiles" className={ clsFiles }>
					{ dropzoneFiles }
				</div>*/

				/*<Button icon="file_upload" type="button" floating accent onClick={ this._openInput.bind( this ) } className={ clsButton } />*/

		const files = this.state.filesDropped;
		this._createDropzoneFiles( files );


		return (

			<div className={ cls } { ...dropzoneProps } data-dropzone-tb="dropzone" >
				<DropzoneTBZone { ...zoneProps } />
				<Button icon="file_upload" type="button" floating accent mini onClick={ this._openInput.bind( this ) } className={ clsButton } />
				<p className={ style.prompt }>{ prompt }</p>
				<input { ...elementProps } accept={ accept } multiple={ multiple } className={ style.input } type="file" onChange={ this._onDrop.bind( this ) } ref="dropzoneInput" />
			</div>

		)

	}

	_setPrompt = ( msg ) => {

		this.setState( { prompt: msg } );

	}

	_onValidationsDone ( comp, isValidDrop ){

		if( isValidDrop ){

			let drop = _.extend( comp.props.file, comp.state.validations );
			let validFiles = this.state.value.concat( [ drop ] );
			
			this.setState( { value: validFiles, prompt: 'Yep' }, this.props.elementHandlers.onChange( validFiles ) )

		}else{

			this._setPrompt( 'Nope' );

		}

		//console.log( "unblock dropzone?" );

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

	_onDragEnter ( ){

		this._setPrompt( this.props.promptDrop );

	}

	_onDragLeave ( ){

		this._setPrompt( this.state.promptInit );

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
					prompt: 'Processing...',
					filesDropped: _.extend( state.filesDropped, allFiles )

				} 

			} );

		}else{

			this.setState( { prompt: this.state.promptInit, blockDropzone: false } );

		}

	}

	_openInput ( ){

		this.refs.dropzoneInput.click();

	}

}

export default ElementTB( DropzoneTB );
