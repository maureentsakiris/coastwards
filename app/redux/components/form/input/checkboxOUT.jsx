/*import React from 'react'
import { PropTypes } from 'prop-types'
import hoc from 'components/form/hoc'
import INPUT from 'components/tags/input'
import SPAN from 'components/tags/span'


const checkbox = ( { hocProps } ) => {

	const { form, name, label, onChange, value, selected, controlled } = hocProps

	if( controlled ){

		return(

			<SPAN>
				<INPUT type="checkbox" form={ form } name={ name } value={ value } onChange={ onChange } checked={ selected } /> { label }
			</SPAN>

		)

	}else{

		return(

			<SPAN>
				<INPUT type="checkbox" form={ form } name={ name } value={ value } defaultChecked={ selected } /> { label }
			</SPAN>

		)

	}
	
}

checkbox.defaultProps = {

	selected: false,
	controlled: false

}

checkbox.propTypes = {

	hocProps: PropTypes.shape( {

		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		selected: PropTypes.bool,

		onChange: PropTypes.func

	} )

}

export default hoc( checkbox )*/