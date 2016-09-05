import React, { PropTypes } from 'react'

import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import INPUT from 'components/tags/input'


const main = ( { show, showDropzone, validateFile } ) => {

	const styleZone = {

		height: '300px',
		backgroundColor: 'lightblue'

	}

	const style = {

		display: show ? 'block' : 'none'

	}

	return(

		<FORM id="Upload" action="#" style={ style } >
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

	validateFile: PropTypes.func

}

export default main