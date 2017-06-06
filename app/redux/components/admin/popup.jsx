import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import _ from 'underscore'

import DIV from 'components/tags/div'
import P from 'components/tags/p'
import IMG from 'components/tags/img'

import FORM from 'components/tags/form'
import INPUT from 'components/tags/input'
import SELECTGROUP from 'components/form/selectgroup/selectgroup'
import RADIOGROUP from 'components/form/radiogroup/radiogroup'
import GO from 'components/form/button/go'

import style from './_popup'


class popup extends Component {

	static propTypes = {

		feature: PropTypes.object,
		materials: PropTypes.array,

		hidePopup: PropTypes.func,
		deleteContribution: PropTypes.func,
		updateContribution: PropTypes.func

	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

		this.state = {

			verified: this.props.feature.contribution_verified == 1 ? "1" : "0",
			materialVerified: this.props.feature.contribution_verified ?  this.props.feature.contribution_material_verified : 'notset',
			example: this.props.feature.contribution_example == 1 ? "1" : "0",
			intro: this.props.feature.contribution_intro == 1 ? "1" : "0",
			closeup: this.props.feature.contribution_closeup == 1 ? "1" : "0"

		}

	}

	render () {

		const { feature, materials, deleteContribution, updateContribution } = this.props
		const { contribution_id, contribution_uid, contribution_material } = feature

		const { verified, materialVerified, example, intro, closeup } = this.state

		console.log( feature );

		const options = _.map( materials, ( material ) => {

			let checked = material.value == contribution_material ? true : false
			return { label: material.label, value: material.value, checked: checked }

		} )

		const formID = "contribution_" + contribution_id

		if( !contribution_uid ){

			return(

				<DIV id="Popup" className={ style.popup } style={ { 'display': 'none' } } >
					<DIV className={ style.spinner }></DIV>
				</DIV>

			)
			

		}else{

			return(

				<DIV id="Popup" className={ style.popup } >
					<IMG className={ style.image } src={ "uploads/" + contribution_uid + ".jpg" } alt={ contribution_uid } />
					<FORM id={ formID } action="#" className={ style.form }>
						<INPUT form={ formID } type="hidden" name="contribution_id" value={ contribution_id + '' } />
						<P>Material user: { contribution_material }</P>
						<P>Material verified: <SELECTGROUP form={ formID } label="Material verified" name="contribution_material_verified" options={ options } value={ materialVerified } onChange={ this._setMaterial.bind( this ) } /></P>
						<RADIOGROUP preferPlaceholder={ false } checked={ verified } label="Verified" form={ formID } name="contribution_verified" options={ [ { label: "yes", value: "1" }, { label: "no", value: "0" } ] } value={ verified } onChange={ this._setVerified.bind( this ) } />
						<RADIOGROUP preferPlaceholder={ false } checked={ example } label="Example" form={ formID } name="contribution_example" options={ [ { label: "yes", value: "1" }, { label: "no", value: "0" } ] } value={ example } onChange={ this._setExample.bind( this ) } />
						<RADIOGROUP preferPlaceholder={ false } checked={ intro } label="Intro" form={ formID } name="contribution_intro" options={ [ { label: "yes", value: "1" }, { label: "no", value: "0" } ] } value={ intro } onChange={ this._setIntro.bind( this ) } />
						<RADIOGROUP preferPlaceholder={ false } checked={ closeup } label="Closeup" form={ formID } name="contribution_closeup" options={ [ { label: "yes", value: "1" }, { label: "no", value: "0" } ] } value={ closeup } onChange={ this._setCloseup.bind( this ) } />
					</FORM>
					<DIV className={ style.actions }>
						<GO onClick={ updateContribution.bind( this, formID ) } label="UPDATE" className={ style.update } />
						<GO onClick={ deleteContribution.bind( this, contribution_id, contribution_uid ) } label="DELETE" className={ style.delete } />
					</DIV>

				</DIV>

			)

		}

	

		/*if( !feature.contribution_uid ){

			return (
				
				<DIV id="Popup" className={ style.popup } >
					<DIV className={ style.spinner }></DIV>
				</DIV>

			)

		}else{

			const { contribution_verified, contribution_material, contribution_material_verified, contribution_comment, contribution_uid, contribution_exif_datetime } = feature


			const material = contribution_verified ? contribution_material_verified : contribution_material
			const m = _.findWhere( materials, { value: contribution_material_verified } )
			const color = m.color
			

			const usercomment = validator.unescape( contribution_comment )
			const hascomment = usercomment != ''
			const showcomment = commentToggled && hascomment
			const commentIcon = showcomment ? 'insert_comment' : 'mode_comment'

			const date = contribution_exif_datetime == '0999-12-31T23:00:00.000Z' ? false : contribution_exif_datetime

			const clsVerified = Classnames( "material-icons", style.verified )

			const showVerified = contribution_verified == 1 && material != 'notclose' && material != 'notsure'

			return(

				<DIV id="Popup" className={ style.popup } >
					{ !showcomment && <DIV className={ style.bar }>
						{ date && <p>{ new Date( contribution_exif_datetime ) } </p> }
					</DIV> }
					<DIV className={ style.top } style={ { backgroundImage: 'url("uploads/' + contribution_uid +'.jpg")' } } >
						{ showcomment && <P className={ style.comment } >{ usercomment }</P> }
					</DIV>
					<DIV className={ style.actions }>
						{ material != 'notset' && <P className={ style.label } style={ { backgroundColor: color } } >{ material }{ showVerified && <I className={ clsVerified } >check_circle</I> }</P> }
						
						{ hascomment && <A onClick={ this._toggleComment } className={ style.showcomment } title="Toggle comment" >
							<I className="material-icons">{ commentIcon }</I>
						</A> }
						<A onClick={ hidePopup } className={ style.close } title="Close popup" >
							<I className="material-icons">clear</I>
						</A>
					</DIV>
				</DIV>

			)

		}*/

	}

	_setMaterial = ( e ) => {

		this.setState( { materialVerified: e.currentTarget.value } )

	}

	_setVerified = ( e ) => {

		this.setState( { verified: e.currentTarget.value } )

	}

	_setExample = ( e ) => {

		this.setState( { example: e.currentTarget.value } )

	}

	_setIntro = ( e ) => {

		this.setState( { intro: e.currentTarget.value } )

	}

	_setCloseup = ( e ) => {

		this.setState( { closeup: e.currentTarget.value } )

	}

}

export default popup