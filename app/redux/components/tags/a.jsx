import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, aAttr } from './attributes'

const a = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, aAttr ) )

	return(

		<a target="_blank" rel="noopener noreferrer" { ...allowedProps } >{ children }</a>

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