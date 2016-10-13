import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import I from 'components/tags/i'

import style from './_popup'

const messages = defineMessages( {


} )

const popup = ( { intl, feature, hidePopup, addSnackbarMessage } ) => {

	const { formatMessage } = intl

	const _oops = ( e ) => {

		addSnackbarMessage( 'oops', e )

	}

	if( !feature.properties ){

		return (
			
			<DIV id="Popup" className={ style.popup } ></DIV>

		)

	}else{

		return(

			<DIV id="Popup" className={ style.popup } >
				<DIV className={ style.image } style={ { backgroundImage: 'url(' + feature.properties.image +')' } } />
				<DIV className={ style.actions }>
					<A onClick={ _oops } className={ style.comment } >
						<I className="material-icons">mode_comment</I>
					</A>
					<A onClick={ _oops } className={ style.send } >
						<I className="material-icons">send</I>
					</A>
					<A onClick={ _oops } className={ style.favorite } >
						<I className="material-icons">favorite</I>
					</A>
					<A onClick={ hidePopup } className={ style.clear } >
						<I className="material-icons">clear</I>
					</A>
				</DIV>
			</DIV>

		)

	}
	
}

popup.propTypes = {

	intl: intlShape.isRequired,

	feature: PropTypes.object,

	hidePopup: PropTypes.func,
	addSnackbarMessage: PropTypes.func

}

export default injectIntl( popup )
