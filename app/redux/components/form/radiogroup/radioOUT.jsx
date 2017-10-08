/*import React from 'react'
import { PropTypes } from 'prop-types'
import SPAN from 'components/tags/span'
import INPUT from 'components/tags/input'

import style from './_radio'

const radio = ( { form, label, name, value, selected, controlled, onChange } ) => {

	if( controlled ){

		return(

			<SPAN className={ style.radio }>
				<INPUT type="radio" form={ form } name={ name } value={ value } onChange={ onChange } checked={ selected } />
				<SPAN>{ label }</SPAN>
			</SPAN>

		)

	}else{

		return(

			<SPAN className={ style.radio }>
				<INPUT type="radio" form={ form } name={ name } value={ value } defaultChecked={ selected } />
				<SPAN>{ label }</SPAN>
			</SPAN>

		)

	}
	
}

radio.defaultProps = {

	selected: false,
	controlled: false

}


radio.propTypes = {

	form: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	selected: PropTypes.bool,
	controlled: PropTypes.bool,

	onChange: PropTypes.func

}

export default radio*/