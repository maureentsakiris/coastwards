import React from 'react'
import { PropTypes } from 'prop-types'
import hoc from 'components/form/hoc'
import ICONBUTTON from 'components/form/button/iconbutton'
import INPUT from 'components/tags/input'
import SPAN from 'components/tags/span'

import style from './_iconcheckbox'


const iconcheckbox = ( { hocProps } ) => {

	const { form, name, label, onChange, value, selected } = hocProps

	const icon = selected ? "check_box" : "check_box_outline_blank"

	return(

		<SPAN>
			<INPUT style={ { display: 'none' } } type="checkbox" form={ form } name={ name } label={ label } value={ value } onChange={ () => {} } checked={ selected } />
			<ICONBUTTON className={ style.iconcheckbox } materialIcon={ icon } onChange={ onChange.bind( this, selected, value ) } ><SPAN>{ label }</SPAN></ICONBUTTON>
		</SPAN>

	)
	
}

iconcheckbox.defaultProps = {

	selected: false

}

iconcheckbox.propTypes = {

	hocProps: PropTypes.shape( {


		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		selected: PropTypes.bool.isRequired,
		form: PropTypes.string,
		name: PropTypes.sting,

		onChange: PropTypes.func.isRequired

	} )

}

export default hoc( iconcheckbox )