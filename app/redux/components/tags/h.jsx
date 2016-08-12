import React, { PropTypes } from 'react'

const H = ( { priority, children, id, className } ) => {

	const Tag = `h${ priority }`

	return(

		<Tag id={ id } className={ className } >{ children }</Tag>

	)

}


H.propTypes = {

	priority: PropTypes.number.isRequired,
	children: PropTypes.node.isRequired,
	id: PropTypes.string,
	className: PropTypes.string

}

export default H