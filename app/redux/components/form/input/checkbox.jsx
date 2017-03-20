import React, { PropTypes } from 'react'

import hoc from 'components/form/hoc'
import INPUT from 'components/tags/input'
import SPAN from 'components/tags/span'


const checkbox = ( { hocProps } ) => {

	const { form, name, label, onChange, value, isChecked, controlled } = hocProps

	if( !controlled ){

		return(

			<SPAN>
				<INPUT type="checkbox" form={ form } name={ name } onChange={ onChange } value={ value } defaultChecked={ isChecked } /> { label }
			</SPAN>

		)

	}else{

		<SPAN>
			<INPUT type="checkbox" form={ form } name={ name } onChange={ onChange } value={ value } checked={ isChecked } /> { label }
		</SPAN>

	}
	
}

checkbox.defaultProps = {

	isChecked: false,
	controlled: true

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