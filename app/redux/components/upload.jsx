import React, { Component, PropTypes } from 'react'
import Classnames from 'classnames'
//import _ from 'underscore'

import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import INPUT from 'components/tags/input'
import BR from 'components/tags/br'
import BUTTON from 'components/tags/button'
import I from 'components/tags/i'

import style from './_upload'

export default class upload extends Component{

	static propTypes = {

		show: PropTypes.bool,
		jazzSupported: PropTypes.bool,
		className: PropTypes.string,

		validateFile: PropTypes.func,
		setLayerVisibility: PropTypes.func

	}

	componentDidMount () {

		window.addEventListener( 'dragover', ( e ) => {

			e = e || event;
			e.preventDefault()

		}, false );

		window.addEventListener( 'dragenter', ( e ) => {

			e = e || event;
			e.preventDefault()
			this.setState( { dropzoneActive: true, isDrop: false } )

		}, false );

		window.addEventListener( 'drop', ( e ) => {

			e = e || event;
			e.preventDefault()

		}, false );

	}


	constructor ( props ) {

		super ( props )

		//this.debounce = _.debounce( this.props.validateFile, 500 )

		this.state = {

			dropzoneActive: false,
			dropX: 0,
			dropY: 0,
			isDrop: false

		}

	}

	render () {

		const { jazzSupported, className, show, validateFile } = this.props
		const { dropzoneActive, dropX, dropY, isDrop } = this.state

		const cls = Classnames( className, {

			[ style.hidden ]: !show

		} )

		if( jazzSupported ){

			const clsDropzone = Classnames( style.dropzone, {

				[ style.dropzoneActive ]: dropzoneActive

			} )

			const clsRippler = Classnames( style.rippler, {

				[ style.ripple ]: isDrop

			} )

			return(

				<FORM id="Upload" action="#" className={ cls } >
					<DIV className={ clsRippler } style={ { position: 'absolute', top: dropY, left: dropX } } ></DIV>
					<DIV onDragEnter={ this._onDragEnter } onDragLeave={ this._onDragLeave } onDrop={ this._onDrop.bind( this ) } className={ clsDropzone } ></DIV>
					<BUTTON className={ style.upload } onClick={ this._openInput }><I className="material-icons">add_a_photo</I></BUTTON>
					<INPUT className={ style.hidden } id="images" name="images" onChange={ validateFile } form="Upload" type="file" multiple={ false } accept="image/*" />
				</FORM>

			)


		}else{

			return(

				<FORM id="Upload" action="#" className={ cls } >
					<BR />
					<INPUT id="images" name="images" onChange={ validateFile } form="Upload" type="file" multiple={ false } accept="image/*" />
				</FORM>

			)

		}

	}

	_openInput = ( e ) => {

		e.preventDefault()
		let input = document.getElementById( "images" )
		input.click();

	}

	_onDragEnter = ( ) => {

		this.props.setLayerVisibility( 'prompts', false )
		this.props.setLayerVisibility( 'errors', false )
		this.props.setLayerVisibility( 'statuses', false )

	}

	_onDragLeave = ( ) => {

		this.setState( { dropzoneActive: false } )

	}

	_onDrop = ( e ) => {

		e.persist()
		e.preventDefault()
		
		let { left, top } = document.getElementById( "Upload" ).getBoundingClientRect()
		let { pageX, pageY } = e
		let dropX = pageX - left - window.scrollX
		let dropY = pageY - top - window.scrollY

		this.setState( { dropX: dropX, dropY: dropY, isDrop: true, dropzoneActive: false } )

		//this.props.validateFile( e )

		//let it ripple
		setTimeout( function ( ){

			console.log( e );
			this.props.validateFile( e )

		}, 500 )

		//this.debounce( e )


	}

}
