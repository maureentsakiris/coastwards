import React, { PropTypes } from 'react'

const li = ( { children, id, className } ) => {

	return(

		<li id={ id } className={ className } >{ children }</li>

	)

}


li.propTypes = {

	children: PropTypes.node.isRequired,
	id: PropTypes.string,
	className: PropTypes.string

}

export default li