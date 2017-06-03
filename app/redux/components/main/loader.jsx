import React from 'react'
import { PropTypes } from 'prop-types'
import Classnames from 'classnames'

import DIV from 'components/tags/div'

import style from './_loader'


const loader = ( { className, show } ) => {

	const cls = Classnames( className, style.loader, {

		[ style.show ]: show

	} )

	return(

		<DIV id="Loader" className={ cls } >
			<DIV className={ style.spinner }></DIV>
		</DIV>

	)
	
}

loader.propTypes = {

	className: PropTypes.string,
	show: PropTypes.bool

}

export default loader