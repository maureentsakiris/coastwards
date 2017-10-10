import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { map } from 'underscore'
import { unescape } from 'validator'
import { isEmpty } from 'underscore'

import DIV from 'components/tags/div'
import P from 'components/tags/p'
import A from 'components/tags/a'

import FORM from 'components/tags/form'
import INPUT from 'components/tags/input'
import ICONRADIOGROUP from 'components/form/radiogroup/iconradiogroup'
import GO from 'components/form/button/go'
import LABEL from 'components/tags/label'
import SPAN from 'components/tags/span'

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

		if( !isEmpty( p.feature ) ){

			console.log( p )

			this.setState( { 

				verified: p.feature.contribution_verified.toString(),
				material: p.feature.contribution_material_verified.toString(),
				example: p.feature.contribution_example.toString(),
				intro: p.feature.contribution_intro.toString(),
				closeup: p.feature.contribution_closeup.toString(),

			} )

		}

	}

	constructor ( props ) {

		super ( props )

		this.state = {

			verified: this.props.feature.contribution_verified ? this.props.feature.contribution_verified.toString() : null,
			material: this.props.feature.contribution_material_verified ? this.props.feature.contribution_material_verified.toString() : null,
			example: this.props.feature.contribution_example ? this.props.feature.contribution_example.toString() : null,
			intro: this.props.feature.contribution_intro ? this.props.feature.contribution_intro.toString() : null,
			closeup: this.props.feature.contribution_closeup ? this.props.feature.contribution_closeup.toString() : null,

		}

	}

	render () {

		const { feature, materials, deleteContribution, updateContribution } = this.props
		const { contribution_id, contribution_uid, contribution_material, contribution_comment, contribution_source, contribution_point_manual, contribution_point_corrected } = feature

		if( !contribution_uid ){

			return(

				<DIV id="Popup" className={ style.popup } style={ { 'display': 'none' } } >
					<DIV className={ style.spinner }></DIV>
				</DIV>

			)
			

		}else{

			const { verified, material, example, intro, closeup } = this.state

			const materialOptions = map( materials, ( material ) => {

				let { value, color, label } = material
				return { label: label, value: value, color: color }

			} )

			const yesNo = [

				{ label: 'Yes', value: '1' },
				{ label: 'No', value: '0' }

			]

			const yesNoNotset = [

				{ label: 'Yes', value: '1' },
				{ label: 'No', value: '0' },
				{ label: 'Not set', value: 'notset' }

			]

			const formID = "contribution_" + contribution_id
			const url = "uploads/" + contribution_uid + ".jpg"

			const usercomment = unescape( contribution_comment )

			return(

				<DIV id="Popup" className={ style.popup } >
					<DIV className={ style.bar }>
						<SPAN>{ contribution_id } / { contribution_material } / { contribution_source } { contribution_point_manual == 0 ? '/ gps' : '/ manual' } { ( contribution_point_corrected && contribution_point_manual == 0 ) ? '/ corrected' : '/ not corrected' }</SPAN>
						<P>{ usercomment }</P>
						<A href={ url } className="material-icons">open_in_new</A>
					</DIV>
					<DIV className={ style.image } style={ { backgroundImage: 'url("' + url +'")' } } ></DIV>
					<FORM id={ formID } action="#" className={ style.form }>
						<INPUT form={ formID } type="hidden" name="id" value={ contribution_id.toString() } />
						<ICONRADIOGROUP form={ formID } label="Verified:" name="verified" preferPlaceholder={ false } options={ yesNo } onChange={ this._setVerified.bind( this ) } selected={ verified } />
						<ICONRADIOGROUP form={ formID } label="Material verified:" name="material" preferPlaceholder={ false } options={ materialOptions } onChange={ this._setMaterial.bind( this ) } selected={ material } />
						<ICONRADIOGROUP form={ formID } label="Closeup:" name="closeup" preferPlaceholder={ false } options={ yesNoNotset } onChange={ this._setCloseup.bind( this ) } selected={ closeup } />
						<ICONRADIOGROUP form={ formID } label="Example:" name="example" preferPlaceholder={ false } options={ yesNo } onChange={ this._setExample.bind( this ) } selected={ example } />
						<ICONRADIOGROUP form={ formID } label="Intro:" name="intro" preferPlaceholder={ false } options={ yesNo } onChange={ this._setIntro.bind( this ) } selected={ intro } />
					</FORM>
					<DIV className={ style.actions }>
						<GO onClick={ deleteContribution.bind( this, contribution_id, contribution_uid ) } label="DELETE" className={ style.delete } />
						<GO onClick={ updateContribution.bind( this, formID ) } label="UPDATE" className={ style.update } />
					</DIV>

				</DIV>

			)

		}

	}

	_setMaterial = ( value ) => {

		this.setState( { material: value } )

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