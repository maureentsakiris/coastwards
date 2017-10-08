import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { map } from 'underscore'
import { unescape } from 'validator'

import DIV from 'components/tags/div'
import P from 'components/tags/p'
import BR from 'components/tags/br'
import HR from 'components/tags/hr'
import A from 'components/tags/a'

import FORM from 'components/tags/form'
import INPUT from 'components/tags/input'
import SELECTGROUP from 'components/form/selectgroup/selectgroup'
import ICONRADIOGROUP from 'components/form/radiogroup/iconradiogroup'
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

	componentWillReceiveProps ( p ){

		this.setState( { 

			verified: p.feature.contribution_verified == 1 ? '1' : '0',
			material: p.feature.contribution_material_verified ?  p.feature.contribution_material_verified : 'notset',
			example: p.feature.contribution_example == 1 ? '1' : '0',
			intro: p.feature.contribution_intro == 1 ? '1' : '0',
			closeup: p.feature.contribution_closeup == 1 ? '1' : '0',

		} )

	}

	constructor ( props ) {

		super ( props )

		this.state = {

			verified: this.props.feature.contribution_verified == 1 ? '1' : '0',
			material: this.props.feature.contribution_verified ?  this.props.feature.contribution_verified : 'notset',
			example: this.props.feature.contribution_example == 1 ? '1' : '0',
			intro: this.props.feature.contribution_intro == 1 ? '1' : '0',
			closeup: this.props.feature.contribution_closeup == 1 ? '1' : '0'

		}

	}

	render () {

		const { feature, materials, deleteContribution, updateContribution } = this.props
		const { contribution_id, contribution_uid, contribution_material, contribution_comment, contribution_source } = feature

		const { verified, material, example, intro, closeup } = this.state

		if( !contribution_uid ){

			return(

				<DIV id="Popup" className={ style.popup } style={ { 'display': 'none' } } >
					<DIV className={ style.spinner }></DIV>
				</DIV>

			)
			

		}else{

			const materialOptions = map( materials, ( material ) => {

				let { value, color, label } = material
				return { label: label, value: value, color: color }

			} )

			const yesNo = [

				{ label: 'Yes', value: '1' },
				{ label: 'No', value: '0' }

			]

			const formID = "contribution_" + contribution_id
			//const url = contribution_source == 'webapp' ? "uploads/" + contribution_uid + ".jpg" : "http://geolittoral.application.developpement-durable.gouv.fr/telechargement/tc_smartphone/photos/" + contribution_uid + ".jpg"
			const url = "uploads/" + contribution_uid + ".jpg"

			const usercomment = unescape( contribution_comment )

			return(

				<DIV id="Popup" className={ style.popup } >
					<DIV className={ style.bar }><A href={ url } className="material-icons">open_in_new</A></DIV>
					<DIV className={ style.top } style={ { backgroundImage: 'url("' + url +'")' } } ></DIV>
					<FORM id={ formID } action="#" className={ style.form }>
						<INPUT form={ formID } type="hidden" name="contribution_id" value={ contribution_id + '' } />
						<P>ID: { contribution_id }</P>
						<P>User material: { contribution_material }</P>
						<P>User comment: { usercomment }</P>
						<HR />
						<ICONRADIOGROUP form={ formID } label="Material verified" name="material" preferPlaceholder={ false } options={ materialOptions } onChange={ this._setMaterial.bind( this ) } selected={ material } />
						<ICONRADIOGROUP form={ formID } label="Verified" name="verified" preferPlaceholder={ false } options={ yesNo } onChange={ this._setVerified.bind( this ) } selected={ verified } /><BR/>
						<ICONRADIOGROUP form={ formID } label="Closeup" name="closeup" preferPlaceholder={ false } options={ yesNo } onChange={ this._setCloseup.bind( this ) } selected={ closeup } /><BR/>
						<ICONRADIOGROUP form={ formID } label="Example" name="example" preferPlaceholder={ false } options={ yesNo } onChange={ this._setExample.bind( this ) } selected={ example } /><BR/>
						<ICONRADIOGROUP form={ formID } label="Intro" name="ntro" preferPlaceholder={ false } options={ yesNo } onChange={ this._setIntro.bind( this ) } selected={ intro } /><BR/>
					</FORM>
					<DIV className={ style.actions }>
						<GO onClick={ deleteContribution.bind( this, contribution_id, contribution_uid ) } label="DELETE" className={ style.delete } />
						<GO onClick={ updateContribution.bind( this, formID ) } label="UPDATE" className={ style.update } />
					</DIV>

				</DIV>

			)

		}

	}

	_setMaterial = ( e ) => {

		this.setState( { material: e.currentTarget.value } )

	}

	_setVerified = ( value ) => {

		this.setState( { verified: value } )

	}

	_setExample = ( value ) => {

		this.setState( { example: value } )

	}

	_setIntro = ( value ) => {

		this.setState( { intro: value } )

	}

	_setCloseup = ( value ) => {

		this.setState( { closeup: value } )

	}

}

export default popup