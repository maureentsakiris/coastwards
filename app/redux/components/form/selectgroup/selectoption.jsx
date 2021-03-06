import React from 'react'
import { PropTypes } from 'prop-types'
import OPTION from 'components/tags/option'

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