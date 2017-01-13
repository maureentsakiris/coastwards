import React, { PropTypes } from 'react'

import OPTION from 'components/tags/option'

//import style from './_select'

const selectoption = ( { label, value } ) => {

	return(

		<OPTION value={ value }>{ label }</OPTION>

	)
	
}

selectoption.defaultProps = {

	defaultChecked: false

}


selectoption.propTypes = {

	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired
}

export default selectoption