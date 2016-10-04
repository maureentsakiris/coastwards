import React, { PropTypes } from 'react'
import Classnames from 'classnames'

import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import INPUT from 'components/tags/input'
import BR from 'components/tags/br'
import BUTTON from 'components/tags/button'

import style from './_upload'


const upload = ( { show, jazzSupported, className, validateFile } ) => {

	const cls = Classnames( className, {

		[ style.hidden ]: !show

	} )

	const clsInput = Classnames( {

		[ style.hidden ]: jazzSupported

	} )

	return(

		<FORM id="Upload" action="#" className={ cls } >
			<BR />
			{ jazzSupported && <DIV onDragOver={ _preventDefault } onDragEnter={ _preventDefault } onDragLeave={ _preventDefault } onDrop={ _onDrop.bind( this, validateFile ) } className={ style.dropzone } ></DIV> }
			{ jazzSupported && <BUTTON className={ style.upload } onClick={ () => {} }><i className="material-icons">file_upload</i></BUTTON> }
			<INPUT className={ clsInput } id="images" name="images" onChange={ validateFile } form="Upload" type="file" multiple={ false } accept="image/*" />
		</FORM>

	)
	
}

const _preventDefault = ( e ) => {

	e.preventDefault()

}

const _onDrop = ( validateFile, e ) => {

	_preventDefault( e )
	validateFile( e )

}

upload.propTypes = {

	show: PropTypes.bool,
	jazzSupported: PropTypes.bool,
	className: PropTypes.string,

	validateFile: PropTypes.func

}

export default upload