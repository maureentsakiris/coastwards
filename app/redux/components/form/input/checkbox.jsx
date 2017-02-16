import React, { PropTypes } from 'react'

import hoc from 'components/form/hoc'
import INPUT from 'components/tags/input'
import SPAN from 'components/tags/span'


const checkbox = ( { hocProps } ) => {

	const { form, name, label, onChange, value, checked } = hocProps

	return(

		<SPAN>
			<INPUT type="checkbox" form={ form } name={ name } onChange={ onChange } value={ value } checked={ checked } /> { label }
		</SPAN>

	)
	
}

checkbox.propTypes = {

	hocProps: PropTypes.shape( {

		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		checked: PropTypes.bool,

		onChange: PropTypes.func

	} )

}

export default hoc( checkbox )
