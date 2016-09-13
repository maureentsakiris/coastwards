import React, { PropTypes } from 'react'

import BUTTON from 'components/tags/button'

import style from './_button'


const go = ( { onClick, label } ) => {

	return(

		<BUTTON type="button" onClick={ onClick } className={ style.go } >{ label }</BUTTON>

	)
	
}

go.propTypes = {

	onClick: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired

}

export default go
