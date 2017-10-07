import React from 'react'
import { PropTypes } from 'prop-types'
import ClassNames from 'classnames'
import hoc from 'components/form/hoc'
import ICON from 'components/form/button/icon'
import SPAN from 'components/tags/span'

import style from './_iconcheckbox'


const iconcheckbox = ( { hocProps } ) => {

	const { label, onClick, value, isChecked, className } = hocProps

	const icon = isChecked ? "check_box" : "check_box_outline_blank"

	const clsIcon = ClassNames( className, style.iconcheckbox )

	return(

		<ICON className={ clsIcon } materialIcon={ icon } onClick={ onClick.bind( this, isChecked, value ) } ><SPAN>{ label }</SPAN></ICON>

	)
	
}

iconcheckbox.defaultProps = {

	isChecked: false

}

iconcheckbox.propTypes = {

	hocProps: PropTypes.shape( {

		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		isChecked: PropTypes.bool.isRequired,

		onClick: PropTypes.func

	} )

}

export default hoc( iconcheckbox )