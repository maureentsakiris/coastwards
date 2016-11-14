import React, { PropTypes } from 'react'
import Classnames from 'classnames'


import DIV from 'components/tags/div'
import IMG from 'components/tags/img'
import I from 'components/tags/i'
import BUTTON from 'components/tags/button'

import style from './_marker'


const marker = ( { className, resetMain, setLocation, show, zoom } ) => {

	const cls = Classnames( className, style.marker, {

		[ style.show ]: show

	} )

	const clsDone = Classnames( style.doneBtn, {

		[ style.disabled ]: zoom < 14

	} )

	return(

		<DIV className={ cls } >
			{ zoom >= 14 && <IMG src="./assets/marker-green.png" alt="Location marker" className={ style.img }  /> }
			{ zoom < 14 && <IMG src="./assets/marker-red.png" alt="Location marker" className={ style.img } /> }
			<BUTTON className={ style.cancelBtn } onClick={ resetMain }><I className="material-icons">close</I></BUTTON>
			<BUTTON className={ clsDone } onClick={ setLocation }><I className="material-icons">done</I></BUTTON>
		</DIV> 

	)
	
}

marker.propTypes = {

	className: PropTypes.string,
	show: PropTypes.bool,
	zoom: PropTypes.number,
	center: PropTypes.object,

	resetMain: PropTypes.func,
	setLocation: PropTypes.func

}

export default marker