import React, { PropTypes } from 'react'
import Classnames from 'classnames'

import BUTTON from 'components/tags/button'

import style from './_button'


const go = ( { onClick, label, className } ) => {

	const cls = Classnames( style.go, className )

	return(

		<BUTTON type="button" onClick={ onClick } className={ cls } >{ label }</BUTTON>

	)
	
}

go.propTypes = {

	onClick: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	className: PropTypes.string

}

export default go
