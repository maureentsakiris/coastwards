import React, { PropTypes } from 'react'
import Classnames from 'classnames'

import BUTTON from 'components/tags/button'

import style from './_button'


const cancel = ( { onClick, label, className, disabled } ) => {

	const cls = Classnames( style.cancel, className )

	return(

		<BUTTON type="button" onClick={ onClick } className={ cls } disabled={ disabled } >{ label }</BUTTON>

	)
	
}

cancel.propTypes = {

	onClick: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool

}

export default cancel