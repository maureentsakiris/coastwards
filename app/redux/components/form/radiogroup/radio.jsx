import React, { PropTypes } from 'react'

import SPAN from 'components/tags/span'
import INPUT from 'components/tags/input'

import style from './_radio'

const radio = ( { form, label, name, value, defaultChecked, onClick } ) => {

	return(

		<SPAN className={ style.radio }>
			<INPUT type="radio" form={ form } name={ name } value={ value } onClick={ onClick } defaultChecked={ defaultChecked } />
			<SPAN>{ label }</SPAN>
		</SPAN>

	)
	
}

radio.defaultProps = {

	defaultChecked: false

}


radio.propTypes = {

	form: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	defaultChecked: PropTypes.bool,

	onClick: PropTypes.func.isRequired

}

export default radio