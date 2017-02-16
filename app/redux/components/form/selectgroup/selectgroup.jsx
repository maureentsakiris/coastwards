import React, { PropTypes } from 'react'
import _ from 'underscore'

import hoc from 'components/form/hoc'
import SELECT from 'components/tags/select'
import SELECTOPTION from 'components/form/selectgroup/selectoption'


const selectgroup = ( { hocProps } ) => {

	const { form, name, options, onChange, className, value } = hocProps

	const selects = _renderOptions( options )

	return(

		<SELECT form={ form } name={ name } className={ className } onChange={ onChange } value={ value } >
			{ selects }
		</SELECT>

	)
	
}

const _renderOptions = ( options ) => {

	return _.map( options, ( option, key ) => {

		let { label, value } = option

		return React.createElement( SELECTOPTION, {

			key: key,
			label: label,
			value: value

		} )

	} )

}

selectgroup.propTypes = {

	hocProps: PropTypes.shape( {

		value: PropTypes.string.isRequired,
		options: PropTypes.array.isRequired,
		className: PropTypes.string,

		onChange: PropTypes.func.isRequired

	} )

}

export default hoc( selectgroup )
