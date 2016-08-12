import React, { PropTypes } from 'react'

const menu = ( { children, id, className } ) => {

	return(

		<menu id={ id } className={ className } >{ children }</menu>

	)

}


menu.propTypes = {

	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	className: PropTypes.string

}

export default menu