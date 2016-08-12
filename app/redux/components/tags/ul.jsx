import React, { PropTypes } from 'react'

const ul = ( { children, id, className } ) => {

	return(

		<ul id={ id } className={ className } >{ children }</ul>

	)

}


ul.propTypes = {

	children: PropTypes.node.isRequired,
	id: PropTypes.string,
	className: PropTypes.string

}

export default ul