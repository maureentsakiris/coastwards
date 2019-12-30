import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { defineMessages, injectIntl, intlShape, FormattedDate } from 'react-intl'
import { findWhere } from 'underscore'
import { unescape } from 'validator'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import I from 'components/tags/i'
import P from 'components/tags/p'
import IMG from 'components/tags/img'
import H from 'components/tags/h'
import BR from 'components/tags/br'

import style from './_popup'

const messages = defineMessages( {

	// materials <--> popup.jsx
	// DO NOT DELETE, DYNAMIC!
	sand:{
		id: "sand",
		description: "Material - Sand",
		defaultMessage: "Sand"
	},
	pebble:{
		id: "pebble",
		description: "Material - Pebble",
		defaultMessage: "Pebble"
	},
	rock:{
		id: "rock",
		description: "Material - Rock",
		defaultMessage: "Rock"
	},
	mud:{
		id: "mud",
		description: "Material - Mud",
		defaultMessage: "Mud"
	},
	manmade:{
		id: "manmade",
		description: "Material - Man-made",
		defaultMessage: "Man-made"
	},
	ice:{
		id: "ice",
		description: "Material - Ice",
		defaultMessage: "Ice"
	},
	notsure:{
		id: "notsure",
		description: "Material - Not sure",
		defaultMessage: "Not sure"
	},
	notset:{
		id: "notset",
		description: "Material",
		defaultMessage: "Not set yet"
	},
	notclose:{
		id: "notclose",
		description: " - ",
		defaultMessage: "Not close enough"
	},

	close_popup:{
		id: "close_popup",
		description: "Title - ",
		defaultMessage: "Close popup"
	},
	report_image:{
		id: "report_image",
		description: "Title - ",
		defaultMessage: "Report image"
	},
	toggle_comment:{
		id: "toggle_comment",
		description: "Title - ",
		defaultMessage: "Toggle comment"
	}


} )


class popup extends Component {

	static propTypes = {

		intl: intlShape.isRequired,
		feature: PropTypes.object,
		materials: PropTypes.array,

		hidePopup: PropTypes.func,
		showDialog: PropTypes.func

	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

		this.state = {

			commentToggled: false

		}

	}

	render () {

		const { formatMessage } = this.props.intl
		const { feature, materials, hidePopup, showDialog } = this.props
		const { commentToggled } = this.state

		if( !feature.contribution_uid ){

			return (
				
				<DIV id="Popup" className={ style.popup } >
					<DIV className={ style.spinner }></DIV>
				</DIV>

			)

		}else{

			const { contribution_verified, contribution_material, contribution_material_verified, contribution_comment, contribution_uid, contribution_exif_datetime/*, contribution_hashtag*/, contribution_source, contribution_reported } = feature


			const material = contribution_verified ? contribution_material_verified : contribution_material
			const m = findWhere( materials, { value: contribution_material_verified } )
			const color = m.color
			

			//const url = contribution_source == 'webapp' ? "uploads/" + contribution_uid + ".jpg" : "http://geolittoral.application.developpement-durable.gouv.fr/telechargement/tc_smartphone/photos/" + contribution_uid + ".jpg"
			const url = contribution_reported == '1' ? "assets/reported.jpg" : "uploads/" + contribution_uid + ".jpg"
			

			

			const usercomment = unescape( contribution_comment )
			
			const hascomment = usercomment != '' || contribution_source == 'rivages'
			const showcomment = commentToggled && hascomment
			const commentIcon = showcomment ? 'insert_comment' : 'mode_comment'

			const date = contribution_exif_datetime == '0999-12-31T23:00:00.000Z' ? false : contribution_exif_datetime

			const clsVerified = Classnames( "material-icons", style.verified )

			const showVerified = contribution_verified == 1 && material != 'notclose' && material != 'notsure'

			const clsTop = Classnames( style.top, {

				[ style.rivages ]: contribution_source == 'rivages'

			} )


			return(

				<DIV id="Popup" className={ style.popup } >
					{ !showcomment && <DIV className={ style.bar }>
						{ !contribution_reported && <A onClick={ showDialog.bind( this, 'REPORT' ) } className={ style.report } title={ formatMessage( messages.report_image ) } >
							<I className="material-icons">report_problem</I>
						</A> }
						{ date && <FormattedDate
							value={ new Date( contribution_exif_datetime ) }
							year="numeric"
							month="long"
						/> }
					</DIV> }
					<DIV className={ clsTop } style={ { backgroundImage: 'url("' + url +'")' } } >
						{ showcomment && <DIV className={ style.comment } >
							{ contribution_source == 'webapp' && <P>{ usercomment }</P> }
							{ contribution_source == 'app' && <P>{ usercomment }</P> }
							{ contribution_source == 'rivages' && <H priority={ 1 } >Rivages</H> }
							{ contribution_source == 'rivages' && 
								<P>This image was uploaded in collaboration with "Rivages", a Citizen Science project developed by Cerema. The goal of "Rivages" is to monitor changes of shorelines by asking participants to trace them with their mobile phones.
									<BR/><BR/>
								Live at the coast? <A href="http://www.geolittoral.developpement-durable.gouv.fr/suivi-du-trait-de-cote-par-smartphone-r489.html" >Find out more</A> about the project and <A href="https://play.google.com/store/apps/details?id=fr.cerema.rivages&hl=en">download their app</A> at Google Play!</P> 
							}
							{ contribution_source == 'rivages' && <A href="https://play.google.com/store/apps/details?id=fr.cerema.rivages&hl=en"><IMG className={ style.googleplay } src="assets/googleplay.png" alt="Get it on Google Play" /></A> }
						</DIV> }
					</DIV>
					<DIV className={ style.actions }>
						{ material != 'notset' && <P className={ style.label } style={ { backgroundColor: color } } >{ formatMessage( messages[ material ] ) }{ showVerified && <I className={ clsVerified } >check_circle</I> }</P> }
						
						{ hascomment && <A onClick={ this._toggleComment } className={ style.showcomment } title={ formatMessage( messages.toggle_comment ) } >
							<I className="material-icons">{ commentIcon }</I>
						</A> }
						<A onClick={ hidePopup } className={ style.close } title={ formatMessage( messages.close_popup ) } >
							<I className="material-icons">clear</I>
						</A>
					</DIV>
				</DIV>

			)

		}

	}

	_toggleComment = () => {

		this.setState( { commentToggled: !this.state.commentToggled } )

	}

}

export default injectIntl( popup )