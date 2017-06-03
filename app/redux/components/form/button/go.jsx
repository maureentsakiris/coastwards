import React from 'react'
import { PropTypes } from 'prop-types'
import Classnames from 'classnames'

import BUTTON from 'components/tags/button'

import style from './_button'


const go = ( { onClick, label, className, disabled } ) => {

	const cls = Classnames( style.go, className )

	return(

		<BUTTON type="button" onClick={ onClick } className={ cls } disabled={ disabled }>{ label }</BUTTON>

	)
	
}

go.propTypes = {

	onClick: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool

}

export default go