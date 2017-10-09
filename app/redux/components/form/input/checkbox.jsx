import React from 'react'
import { PropTypes } from 'prop-types'
import hoc from 'components/form/hoc'
import INPUT from 'components/tags/input'
import SPAN from 'components/tags/span'


const checkbox = ( { hocProps } ) => {

	const { form, name, label, value, selected } = hocProps

	return(

		<SPAN>
			<INPUT type="checkbox" form={ form } name={ name } value={ value } defaultChecked={ selected } /> { label }
		</SPAN>

	)
	
}

checkbox.defaultProps = {

	selected: false

}

checkbox.propTypes = {

	hocProps: PropTypes.shape( {

		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		selected: PropTypes.bool

	} )

}

export default hoc( checkbox )