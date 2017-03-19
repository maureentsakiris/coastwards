import React, { PropTypes } from 'react'
import Classnames from 'classnames'

import DIV from 'components/tags/div'

import style from './_loader'


const loader = ( { className, show } ) => {

	const clsJazz = Classnames( className, style.jazz, {

		[ style.show ]: show

	} )

	return(

		<DIV id="Loader" className={ clsJazz } >
			<DIV className={ style.spinner }></DIV>
		</DIV>

	)
	
}

loader.propTypes = {

	className: PropTypes.string,
	show: PropTypes.bool

}

export default loader