import React, { PropTypes } from 'react'
import Classnames from 'classnames'

import A from 'components/tags/a'
import I from 'components/tags/i'

import style from './_close'


const close = ( { className, onClick, title } ) => {

	const clsIcon = Classnames( 'material-icons', style.icon, className )

	return(

		<A className={ className } onClick={ onClick } title={ title } ><I className={ clsIcon } >&#xE5CD;</I></A>

	)
	
}

close.propTypes = {

	className: PropTypes.string,
	title: PropTypes.string,

	onClick: PropTypes.func

}

close.defaultProps = {

	title: 'Close'

}

export default close