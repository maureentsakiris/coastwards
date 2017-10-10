import React from 'react'
import { PropTypes } from 'prop-types'
import Classnames from 'classnames'

import BUTTON from 'components/tags/button'
import I from 'components/tags/i'

import styleSheet from './_button'


const iconbutton = ( { onChange, children, className, disabled, materialIcon, style, outline } ) => {

	const cls = Classnames( styleSheet.iconbutton, className, {

		[ styleSheet.outline ]: outline

	} )	

	return(

		<BUTTON style={ style } type="button" onClick={ onChange } className={ cls } disabled={ disabled }><I className="material-icons">{ materialIcon }</I> { children }</BUTTON>

	)
	
}

iconbutton.defaultProps = {

	outline: false

}

iconbutton.propTypes = {

	onChange: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	materialIcon: PropTypes.string,
	style: PropTypes.object,
	outline: PropTypes.bool

}

export default iconbutton