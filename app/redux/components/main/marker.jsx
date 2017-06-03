import React from 'react'
import { PropTypes } from 'prop-types'
import Classnames from 'classnames'


import DIV from 'components/tags/div'

import style from './_marker'


const marker = ( { className, show, zoom, image } ) => {

	const cls = Classnames( className, style.marker, {

		[ style.show ]: show

	} )

	const locked = zoom < 14

	const clsTip = Classnames( style.tip, {

		[ style.tip_locked ]: locked

	} )

	const clsImg = Classnames( style.img, {

		[ style.img_locked ]: locked

	} )

	return(

		<DIV className={ cls } >
			<DIV className={ style.pointer }>
				{ image.dataURL && <DIV style={ { backgroundImage: 'url(' + image.dataURL + ')' } } className={ clsImg } ></DIV> }
				<DIV className={ clsTip }></DIV>
			</DIV>
		</DIV> 

	)
	
}


marker.propTypes = {

	className: PropTypes.string,
	show: PropTypes.bool,
	zoom: PropTypes.number,
	image: PropTypes.object

}

export default marker
