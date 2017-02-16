import React, { PropTypes } from 'react'

import SPAN from 'components/tags/span'
import INPUT from 'components/tags/input'

import style from './_radio'

const radio = ( { form, label, name, value, isChecked, controlled, onChange } ) => {

	if( !controlled ){

		return(

			<SPAN className={ style.radio }>
				<INPUT type="radio" form={ form } name={ name } value={ value } onChange={ onChange } defaultChecked={ isChecked } />
				<SPAN>{ label }</SPAN>
			</SPAN>

		)

	}else{

		return(

			<SPAN className={ style.radio }>
				<INPUT type="radio" form={ form } name={ name } value={ value } onChange={ onChange } checked={ isChecked } />
				<SPAN>{ label }</SPAN>
			</SPAN>

		)

	}
	
}

radio.defaultProps = {

	defaultChecked: false,
	controlled: true

}


radio.propTypes = {

	form: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	isChecked: PropTypes.bool,
	controlled: PropTypes.bool,

	onChange: PropTypes.func.isRequired

}

export default radio