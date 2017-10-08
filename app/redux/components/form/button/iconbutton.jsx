import React from 'react'
import { PropTypes } from 'prop-types'
import Classnames from 'classnames'

import BUTTON from 'components/tags/button'
import I from 'components/tags/i'

import styleSheet from './_button'


const iconbutton = ( { onChange, children, className, disabled, materialIcon, style } ) => {

	const cls = Classnames( styleSheet.iconbutton, className )

	return(

		<BUTTON style={ style } type="button" onClick={ onChange } className={ cls } disabled={ disabled }><I className="material-icons">{ materialIcon }</I> { children }</BUTTON>

	)
	
}

iconbutton.propTypes = {

	onChange: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	materialIcon: PropTypes.string,
	style: PropTypes.object

}

export default iconbutton