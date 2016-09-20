import React, { PropTypes } from 'react'
import Classnames from 'classnames'

import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import INPUT from 'components/tags/input'
import BR from 'components/tags/br'

//import style from './_upload'


const main = ( { show, showDropzone, className, validateFile } ) => {

	const styleZone = {

		height: '300px',
		backgroundColor: 'lightblue'

	}

	const s = {

		display: show ? 'block' : 'none'

	}

	const cls = Classnames( className )

	return(

		<FORM id="Upload" action="#" style={ s } className={ cls } >
			<BR />
			<INPUT id="images" name="images" onChange={ validateFile } form="Upload" type="file" multiple={ false } accept="image/*" />
			{ showDropzone && <DIV onDragOver={ _preventDefault } onDragEnter={ _preventDefault } onDragLeave={ _preventDefault } onDrop={ _onDrop.bind( this, validateFile ) } style={ styleZone } ></DIV> }
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

main.propTypes = {

	show: PropTypes.bool,
	showDropzone: PropTypes.bool,
	className: PropTypes.string,

	validateFile: PropTypes.func

}

export default main