import React, { PropTypes } from 'react'
import _ from 'underscore'
import tag from './tag'
import { globalAttr, imgAttr } from './attributes'

const img = ( { hocProps } ) => {

	const allowedProps = _.pick( hocProps, _.union( globalAttr, imgAttr ) )

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

export default tag( img )