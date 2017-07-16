import React from 'react'
import { PropTypes } from 'prop-types'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
//import Classnames from 'classnames'
//import { CSSTransitionGroup } from 'react-transition-group'


import P from 'components/tags/p'
import DIV from 'components/tags/div'
import GO from 'components/form/button/go'
import CANCEL from 'components/form/button/cancel'

import style from './_snackbar'


const intlMessages = defineMessages( {

	error_mail_sent:{
		id: "error_mail_sent",
		description: "Warning - ",
		defaultMessage: "Sorry, an unknown error ocurred. We have been notified."
	},
	selected_truncated:{
		id: "selected_truncated",
		description: "Warning - Informs the user that more than one file have been dropped but we can only process one at a time",
		defaultMessage: "Sorry, at the moment we can only process one image at a time!"
	},
	here_we_go:{
		id: "here_we_go",
		description: "Snack - ",
		defaultMessage: "Found the location!! Here we go!"
	},
	zoom_until:{
		id: "zoom_until",
		description: "Snack - ",
		defaultMessage: "Zoom until the marker turns green and points to the location you took this picture!"
	},
	zoom_closer:{
		id: "zoom_closer",
		description: " - ",
		defaultMessage: "You gotta zoom until the marker turns green!"
	},
	two_fingers:{
		id: "two_fingers",
		description: "Snack - ",
		defaultMessage: "Use two fingers to zoom"
	},
	accept_terms_first:{
		id: "accept_terms_first",
		description: "Snack - ",
		defaultMessage: "You still have to accept the terms!"
	},
	continue_upload:{
		id: "continue_upload",
		description: "Button",
		defaultMessage: "Place image"
	},
	cancel_upload:{
		id: "cancel_upload",
		description: "Button",
		defaultMessage: "Cancel"
	},
	yes:{
		id: "yes",
		description: "Button",
		defaultMessage: "Yes"
	},
	no:{
		id: "no",
		description: "Button",
		defaultMessage: "No"
	},
	ok:{
		id: "ok",
		description: "Button",
		defaultMessage: "OK"
	},
	location_right:{
		id: "location_right",
		description: "Snack",
		defaultMessage: "Does the location look right?"
	}

} )

const snackbar = ( { intl, /*jazzSupported,*/ message, yes, no, dismissSnackbar } ) => {

	const { formatMessage } = intl
	const mess = typeof message === 'object' ? message.message : message //if error object
	const m = intlMessages[ mess ] ? formatMessage( intlMessages[ mess ] ) : mess //if translation 

	/*const clsMsg = Classnames( style.msg, {

		[ style.msgActionJazz ]: jazzSupported && yes

	} )*/

	/*const clsMsg = Classnames( style.hide, {

		[ style.show ]: m

	} )*/


	return(

		<DIV className={ style.snackbar }>
			{ m && <DIV key="snackbar" >
				{ m }
				<P>
					{ no && <CANCEL onClick={ dismissSnackbar.bind( this, no.action ) } label={ formatMessage( intlMessages[ no.label ] ) } /> }
					{ yes && <GO onClick={ dismissSnackbar.bind( this, yes.action ) } label={ formatMessage( intlMessages[ yes.label ] ) } /> }
				</P>
			</DIV> }
		</DIV>

	)

	/*return(

		<CSSTransitionGroup 

			component="div"
			className={ style.snackbar }
			transitionAppear={ true } 
			transitionName={ {

				enter: style.enter,
				enterActive: style.enterActive,
				leave: style.leave,
				leaveActive: style.leaveActive,
				appear: style.enter,
				appearActive: style.enterActive

			} }
			transitionEnterTimeout={ 300 }
			transitionLeaveTimeout={ 300 }
			transitionAppearTimeout={ 300 }

		>
			{ m && <DIV key="snackbar">
				{ m }
				<P>
					{ no && <CANCEL onClick={ dismissSnackbar.bind( this, no.action ) } label={ formatMessage( intlMessages[ no.label ] ) } /> }
					{ yes && <GO onClick={ dismissSnackbar.bind( this, yes.action ) } label={ formatMessage( intlMessages[ yes.label ] ) } /> }
				</P>
			</DIV> }
		</CSSTransitionGroup>

	)*/


	/*if( jazzSupported ){

		return(

			<CSSTransitionGroup 

				component="div"
				className={ style.snackbarNoJazz }
				transitionAppear={true} 
				transitionName={ {

					enter: style.enter,
					enterActive: style.enterActive,
					leave: style.leave,
					leaveActive: style.leaveActive,
					appear: style.enter,
					appearActive: style.enterActive

				} }
				transitionEnterTimeout={ 300 }
				transitionLeaveTimeout={ 300 }
				transitionAppearTimeout={ 300 }

			>
				{ m && <DIV>
					<SPAN>{ m }</SPAN>
					<SPAN>
						{ no && <CANCEL onClick={ dismissSnackbar.bind( this, no.action ) } label={ formatMessage( intlMessages[ no.label ] ) } /> }
						{ yes && <GO onClick={ dismissSnackbar.bind( this, yes.action ) } label={ formatMessage( intlMessages[ yes.label ] ) } /> }
					</SPAN>
				</DIV> }
			</CSSTransitionGroup>

		)

	}else{

		return(

			<CSSTransitionGroup 

				component="div"
				className={ style.snackbar }
				transitionAppear={true} 
				transitionName={ {

					enter: style.enter,
					enterActive: style.enterActive,
					leave: style.leave,
					leaveActive: style.leaveActive,
					appear: style.enter,
					appearActive: style.enterActive

				} }
				transitionEnterTimeout={ 300 }
				transitionLeaveTimeout={ 300 }
				transitionAppearTimeout={ 300 }

			>
				{ m && <DIV className={ style.msg }>
					<SPAN className={ style.message } >{ m }</SPAN>
					<SPAN className={ style.actions } >
						{ no && <CANCEL onClick={ dismissSnackbar.bind( this, no.action ) } label={ formatMessage( intlMessages[ no.label ] ) } /> }
						{ yes && <GO onClick={ dismissSnackbar.bind( this, yes.action ) } label={ formatMessage( intlMessages[ yes.label ] ) } /> }
					</SPAN>
				</DIV> }
			</CSSTransitionGroup>

		)

	}*/

	

} 

snackbar.propTypes = {

	intl: intlShape,
	/*jazzSupported: PropTypes.bool,*/
	message: PropTypes.string.isRequired,
	yes: PropTypes.object,
	no: PropTypes.object,

	dismissSnackbar: PropTypes.func

}

export default injectIntl ( snackbar )
