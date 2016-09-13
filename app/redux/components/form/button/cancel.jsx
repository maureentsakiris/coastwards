import React, { PropTypes } from 'react'

import BUTTON from 'components/tags/button'

import style from './_button'


const cancel = ( { onClick, label } ) => {

	return(

		<BUTTON type="button" onClick={ onClick } className={ style.cancel } >{ label }</BUTTON>

	)
	
}

cancel.propTypes = {

	onClick: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired

}

export default cancel
