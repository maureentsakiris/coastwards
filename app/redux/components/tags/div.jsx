import React, { PropTypes } from 'react'

const div = ( { children, id, className, lang, dir } ) => {

	return(

		<div id={ id } className={ className } lang={ lang } dir={ dir } >{ children }</div>

	)

}


div.propTypes = {

	children: PropTypes.node.isRequired,
	id: PropTypes.string,
	className: PropTypes.string,
	lang: PropTypes.string,
	dir: PropTypes.string

}

export default div