import React, { PropTypes } from 'react'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, aAttr } from './attributes'

const a = ( { hocProps } ) => {

	const { children, onClick, active, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, aAttr ) )

	const _onClick = ( e ) => {

		e.preventDefault()
		onClick()

	}
	const _active = active ? { className: 'active' } : { onClick: _onClick, href: '#' }

	return(

		<a { ...allowedProps } { ..._active } >{ children }</a>

	)

}

a.propTypes = {

	hocProps: PropTypes.shape( {

		active: PropTypes.bool,
		onClick: PropTypes.func,

		download: PropTypes.bool,
		href: PropTypes.string,
		hrefLang: PropTypes.string,
		media: PropTypes.string,
		rel: PropTypes.oneOf( [ 'alternate', 'author', 'bookmark', 'help', 'license', 'next', 'nofollow', 'noreferrer', 'prefetch', 'prev', 'search', 'tag' ] ),
		target: PropTypes.string //Can also be a framename

	} )

}

export default hoc( a )