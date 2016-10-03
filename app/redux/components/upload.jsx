import React, { PropTypes } from 'react'
import Classnames from 'classnames'

import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import INPUT from 'components/tags/input'
import BR from 'components/tags/br'

import style from './_upload'


const upload = ( { show, dndSupported, mapboxSupported, className, validateFile } ) => {

	const s = {

		display: show ? 'block' : 'none'

	}

	const showDropzone = dndSupported && mapboxSupported

	const cls = Classnames( className )

	return(

		<FORM id="Upload" action="#" style={ s } className={ cls } >
			<BR />
			{ showDropzone && <DIV onDragOver={ _preventDefault } onDragEnter={ _preventDefault } onDragLeave={ _preventDefault } onDrop={ _onDrop.bind( this, validateFile ) } className={ style.dropzone } ></DIV> }
			<INPUT id="images" name="images" onChange={ validateFile } form="Upload" type="file" multiple={ false } accept="image/*" />
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
	mapboxSupported: PropTypes.bool,
	dndSupported: PropTypes.bool,
	className: PropTypes.string,

	validateFile: PropTypes.func

}

export default upload