import React, { PropTypes } from 'react'
import Classnames from 'classnames'

import BUTTON from 'components/tags/button'
import I from 'components/tags/i'

import styleSheet from './_button'


const icon = ( { onClick, children, className, disabled, materialIcon, style } ) => {

	const cls = Classnames( styleSheet.icon, className )

	return(

		<BUTTON style={ style } type="button" onClick={ onClick } className={ cls } disabled={ disabled }><I className="material-icons">{ materialIcon }</I> { children }</BUTTON>

	)
	
}

icon.propTypes = {

	onClick: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	materialIcon: PropTypes.string,
	style: PropTypes.object

}

export default icon