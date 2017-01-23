import React, { /*Component,*/ PropTypes } from 'react'
import ClassNames from 'classnames'

import ICON from 'components/form/button/icon'
import SPAN from 'components/tags/span'

import style from './_radio'


const radio = ( { label, value, checked, className, backgroundColor, onClick } ) => {

	const icon = checked ? "radio_button_checked" : "radio_button_unchecked"

	const clsIcon = ClassNames( className, style.icon )

	return(

		<ICON style={ { 'backgroundColor': backgroundColor } } className={ clsIcon } materialIcon={ icon } onClick={ onClick.bind( this, value ) }><SPAN>{ label }</SPAN></ICON>

	)
	
}

radio.defaultProps = {

	checked: false,
	jazz: true

}


radio.propTypes = {

	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	className: PropTypes.string,
	backgroundColor: PropTypes.string,

	onClick: PropTypes.func.isRequired

}

export default radio