import React from 'react'
import { PropTypes } from 'prop-types'

import ICONBUTTON from 'components/form/button/iconbutton'
import SPAN from 'components/tags/span'

import style from './_iconradio'


const iconradio = ( { form, label, name, value, selected, color, onChange } ) => {

	const icon = selected ? "radio_button_checked" : "radio_button_unchecked"

	return(

		<SPAN>
			<input type="radio" form={ form } label={ label } name={ name } value={ value } onChange={ () => {} } checked={ selected } />
			<ICONBUTTON style={ { 'backgroundColor': color } } className={ style.icon } materialIcon={ icon } onChange={ onChange.bind( this, value ) }><SPAN>{ label }</SPAN></ICONBUTTON>
		</SPAN>

	)
	
}

iconradio.defaultProps = {

	selected: false

}


iconradio.propTypes = {

	form: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired,
	color: PropTypes.string,

	onChange: PropTypes.func.isRequired

}

export default iconradio