import React, { Component, PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import INPUT from 'components/tags/input'
import BR from 'components/tags/br'
import BUTTON from 'components/tags/button'
import I from 'components/tags/i'


import style from './_upload'

const messages = defineMessages( {

	uploadBtn_title:{
		id: "uploadBtn_title",
		description: "Title - ",
		defaultMessage: "Upload an image"
	},
	shareBtn_title:{
		id: "shareBtn_title",
		description: "Title - ",
		defaultMessage: "Share with friends"
	}

	
} )

class upload extends Component{

	static propTypes = {

		intl: intlShape.isRequired,

		show: PropTypes.bool,
		jazzSupported: PropTypes.bool,
		className: PropTypes.string,
		clipped: PropTypes.bool,

		validateFile: PropTypes.func,
		setLayerVisibility: PropTypes.func,
		openInput: PropTypes.func/*,
		showDialog: PropTypes.func*/

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
				this.props.setLayerVisibility( 'prompts', false )
				this.props.setLayerVisibility( 'errors', false )
				this.props.setLayerVisibility( 'statuses', false )

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
			dropX: 0,
			dropY: 0,
			isDrop: false

		}

	}

	render () {

		const { formatMessage } = this.props.intl
		const { jazzSupported, className, clipped, show, validateFile, openInput/*, showDialog*/ } = this.props
		const { dropzoneActive, dropX, dropY/*, isDrop*/ } = this.state

		const cls = Classnames( className, {

			[ style.hidden ]: !show

		} )

		if( jazzSupported ){

			const clsDropzone = Classnames( style.dropzone, {

				[ style.dropzoneActive ]: dropzoneActive

			} )

			const clsUploadBtn = Classnames( style.uploadBtn, {

				[ style.fixed ]: clipped

			} )

			/*const clsShareBtn = Classnames( style.shareBtn, {

				[ style.fixed ]: clipped

			} )*/

			/*const clsLegendBtn = Classnames( style.legendBtn, {

				[ style.fixed ]: clipped

			} )
*/
			const clsRippler = Classnames( style.rippler, {

				//[ style.ripple ]: isDrop

			} )
			
			//<I className="material-icons">&#xE2C6;</I>
			//<I className="material-icons">&#xE439;</I>

			//<IMG className={ clsLegendBtn } src="assets/legend.svg" alt="!Show legend" />

			//<BUTTON className={ clsShareBtn } onClick={ showDialog.bind( this, 'share' ) } title={ formatMessage( messages.shareBtn_title ) }><I className="material-icons">&#xE80D;</I></BUTTON>
			

			return(

				<FORM id="Upload" action="#" className={ cls } >
					<DIV className={ clsRippler } style={ { position: 'absolute', top: dropY, left: dropX } } ></DIV>
					<DIV onDragLeave={ this._onDragLeave } onDrop={ this._onDrop.bind( this ) } className={ clsDropzone } ></DIV>
					<BUTTON className={ clsUploadBtn } onClick={ openInput } title={ formatMessage( messages.uploadBtn_title ) }><I className="material-icons">&#xE439;</I></BUTTON>
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

	/*_onDragEnter = ( ) => {

		this.props.setLayerVisibility( 'prompts', false )
		this.props.setLayerVisibility( 'errors', false )
		this.props.setLayerVisibility( 'statuses', false )

	}*/

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

		this.props.validateFile( e )

	}

}

export default injectIntl( upload )
