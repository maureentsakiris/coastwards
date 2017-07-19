import React from 'react'
import { PropTypes } from 'prop-types'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import A from 'components/tags/a'

import style from './_credits'


const credits = ( { showDialog } ) => {

	const clsLogo = Classnames( 'mapboxgl-ctrl-logo', style.logo )
	const clsCopy = Classnames( 'material-icons', style.copy )

	return(

		<DIV className={ style.credits } dir="ltr">
			<A className={ clsCopy } target="_blank" onClick={ showDialog.bind( this, 'CREDITS' ) } >info_outline</A>
			<A className={ clsLogo } target="_blank" href="https://www.mapbox.com/" aria-label="Mapbox logo"></A>
		</DIV>

	)
	
}


credits.propTypes = {

	showDialog: PropTypes.func

}

export default credits