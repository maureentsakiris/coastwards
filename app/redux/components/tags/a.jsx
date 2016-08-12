import React, { PropTypes } from 'react'

const a = ( { children, onClick, active, alt, hreflang } ) => {

	const _onClick = ( e ) => {

		e.preventDefault
		onClick()

	}
	const _active = active ? { 

		className: 'active'
	
	} : {

		onClick: _onClick, 
		href: '#'

	}

	return(

		<a { ..._active }  alt={ alt } hrefLang={ hreflang } >{ children }</a>

	)

}


a.propTypes = {

	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	active: PropTypes.bool.isRequired,
	alt: PropTypes.string.isRequired,
	hreflang: PropTypes.string

}

export default a