import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, imgAttr } from './attributes'

const img = ( { hocProps } ) => {

	const allowedProps = pick( hocProps, union( globalAttr, imgAttr ) )

	return(

		<img { ...allowedProps } />

	)

}

img.propTypes = {

	hocProps: PropTypes.shape( { 

		alt: PropTypes.string.isRequired,
		crossorigin: PropTypes.string,
		height: PropTypes.number,
		ismap: PropTypes.bool,
		longdesc: PropTypes.string,
		src: PropTypes.string.isRequired,
		usemap: PropTypes.string,
		width: PropTypes.number

	} )

}

export default hoc( img )