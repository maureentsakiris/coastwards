import React, { PropTypes } from 'react'

const nav = ( { children, id, className } ) => {

	return(

		<nav id={ id } className={ className } >{ children }</nav>

	)

}


nav.propTypes = {

	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	className: PropTypes.string

}

export default nav