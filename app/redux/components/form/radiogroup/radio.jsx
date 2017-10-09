import React from 'react'
import { PropTypes } from 'prop-types'
import SPAN from 'components/tags/span'
import INPUT from 'components/tags/input'

import style from './_radio'

const radio = ( { form, label, name, value, checked, onChange } ) => {

	return(

		<SPAN className={ style.radio }>
			<INPUT type="radio" form={ form } name={ name } value={ value } onChange={ onChange } checked={ checked } />
			<SPAN>{ label }</SPAN>
		</SPAN>

	)
	
}

radio.defaultProps = {

	checked: false

}


radio.propTypes = {

	form: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	
	onChange: PropTypes.func

}

export default radio