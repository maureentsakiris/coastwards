import React, { PropTypes } from 'react'

import SPAN from 'components/tags/span'
import INPUT from 'components/tags/input'

import style from './_radio'

const radio = ( { form, label, name, value, onClick } ) => {

	return(

		<SPAN className={ style.span }>
			<INPUT type="radio" form={ form } name={ name } value={ value } onClick={ onClick } />{ label }
		</SPAN>

	)
	
}


radio.propTypes = {

	form: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired

}

export default radio