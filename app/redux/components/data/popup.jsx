import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { findWhere } from 'underscore'
import { unescape } from 'validator'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import I from 'components/tags/i'
import P from 'components/tags/p'

import style from './_popup'


class popup extends Component {

	static propTypes = {

		feature: PropTypes.object,
		materials: PropTypes.array,

		hidePopup: PropTypes.func

	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

		this.state = {

			commentToggled: false

		}

	}

	render () {

		const { feature, materials, hidePopup } = this.props
		const { commentToggled } = this.state

		if( !feature.contribution_uid ){

			return (
				
				<DIV id="Popup" className={ style.popup } style={ { 'display': 'none' } }>
					<DIV className={ style.spinner }></DIV>
				</DIV>

			)

		}else{

			const { contribution_verified, contribution_material, contribution_material_verified, contribution_comment, contribution_uid, contribution_exif_datetime/*, contribution_hashtag*/ } = feature


			const material = contribution_verified ? contribution_material_verified : contribution_material
			const m = findWhere( materials, { value: contribution_material_verified } )
			const color = m.color
			

			const usercomment = unescape( contribution_comment )
			const hascomment = usercomment != ''
			const showcomment = commentToggled && hascomment
			const commentIcon = showcomment ? 'insert_comment' : 'mode_comment'

			const date = contribution_exif_datetime == '0999-12-31T23:00:00.000Z' ? false : new Date( contribution_exif_datetime )

			const clsVerified = Classnames( "material-icons", style.verified )

			const showVerified = contribution_verified == 1 && material != 'notclose' && material != 'notsure'

			console.log( date )

			return(

				<DIV id="Popup" className={ style.popup } >
					
					<DIV className={ style.top } style={ { backgroundImage: 'url("uploads/' + contribution_uid +'.jpg")' } } >
						{ showcomment && <P className={ style.comment } >{ usercomment }</P> }
					</DIV>
					<DIV className={ style.actions }>
						{ material != 'notset' && <P className={ style.label } style={ { backgroundColor: color } } >{ m.label }{ showVerified && <I className={ clsVerified } >check_circle</I> }</P> }
						
						{ hascomment && <A onClick={ this._toggleComment } className={ style.showcomment } title="Toggle comment" >
							<I className="material-icons">{ commentIcon }</I>
						</A> }
						<A onClick={ hidePopup } className={ style.close } title="Close Popup" >
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

export default popup