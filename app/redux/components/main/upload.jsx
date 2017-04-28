import React, { Component, PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import INPUT from 'components/tags/input'
import P from 'components/tags/p'
import BUTTON from 'components/tags/button'
import I from 'components/tags/i'


import style from './_upload'

const messages = defineMessages( {

	uploadBtn_title:{
		id: "uploadBtn_title",
		description: "Title - ",
		defaultMessage: "Upload an image"
	},
	uploadBtn_label:{
		id: "uploadBtn_label",
		description: "Label - ",
		defaultMessage: "Upload"
	}
	
} )

class upload extends Component{

	static propTypes = {

		intl: intlShape.isRequired,

		className: PropTypes.string,
		jazzSupported: PropTypes.bool,
		show: PropTypes.bool,
		useraction: PropTypes.string,

		validateFile: PropTypes.func,
		openInput: PropTypes.func,
		clipPage: PropTypes.func,
		resetMain: PropTypes.func

	}

	componentDidMount () {

		window.addEventListener( 'dragover', ( e ) => {

			e = e || event;
			e.preventDefault()

		}, false );

		window.addEventListener( 'dragenter', ( e ) => {

			e = e || event;
			e.preventDefault()

			if( this.props.show ){

				this.setState( { dropzoneActive: true, isDrop: false } )
				this.props.clipPage()
				/*this.props.setLayerVisibility( 'prompts', false )
				this.props.setLayerVisibility( 'errors', false )
				this.props.setLayerVisibility( 'statuses', false )*/

			}

		}, false );

		window.addEventListener( 'drop', ( e ) => {

			e = e || event;
			e.preventDefault()

		}, false );

	}


	constructor ( props ) {

		super ( props )

		this.state = {

			dropzoneActive: false,
			/*dropX: 0,
			dropY: 0,*/
			isDrop: false

		}

	}

	render () {

		const { formatMessage } = this.props.intl
		const { className, jazzSupported, show, useraction, validateFile, openInput } = this.props
		const { dropzoneActive, /*dropX, dropY, isDrop*/ } = this.state

		if( !jazzSupported ){

			const clsNoJazz = Classnames( style.noJazz, {

				[ style.show ]: show

			} )

			return(

				<FORM id="Upload" action="javascript:;" className={ clsNoJazz } >
					<DIV className={ style.uploadBtn }>
						<BUTTON onClick={ openInput } ><I className="material-icons">&#xE439;</I></BUTTON>
						<P>{ formatMessage( messages.uploadBtn_title ) }</P>
					</DIV>
					<INPUT id="images" name="images" onChange={ validateFile } form="Upload" type="file" multiple={ false } accept="image/*" />
				</FORM>

			)

		}else{

			const clsJazz = Classnames( className, style.jazz, {

				[ style.show ]: show

			} )

			const clsUploadBtn = Classnames( style.uploadBtn, {

				[ style.show ]: useraction == 'browsing'

			} )

			const clsDropzone = Classnames( style.dropzone, {

				[ style.dropzoneActive ]: dropzoneActive

			} )

			return(

				<FORM id="Upload" action="javascript:;" className={ clsJazz } >
					<BUTTON className={ clsUploadBtn } onClick={ openInput } title={ formatMessage( messages.uploadBtn_title ) } ><I className="material-icons">&#xE439;</I></BUTTON>
					<DIV onDragLeave={ this._onDragLeave } onDrop={ this._onDrop.bind( this ) } className={ clsDropzone } ></DIV>
					<INPUT id="images" name="images" onChange={ validateFile } form="Upload" type="file" multiple={ false } accept="image/*" />
				</FORM>

			)

		}

	}

	_onDragLeave = ( ) => {

		this.setState( { dropzoneActive: false } )
		this.props.resetMain()

	}

	_onDrop = ( e ) => {

		/*e.persist()*/
		e.preventDefault()
		
		/*let { left, top } = document.getElementById( "Upload" ).getBoundingClientRect()
		let { pageX, pageY } = e
		let dropX = pageX - left - window.scrollX
		let dropY = pageY - top - window.scrollY*/

		this.setState( { /*dropX: dropX, dropY: dropY, */isDrop: true, dropzoneActive: false } )

		this.props.validateFile( e )

	}

}

export default injectIntl( upload )
