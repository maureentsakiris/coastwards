import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { map } from 'underscore'

import DIV from 'components/tags/div'
import P from 'components/tags/p'
import BR from 'components/tags/br'

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

	componentWillReceiveProps ( p ){

		this.setState( { 

			verified: p.feature.contribution_verified == 1 ? true : false,
			materialVerified: p.feature.contribution_material_verified ?  p.feature.contribution_material_verified : p.feature.contribution_material,
			example: p.feature.contribution_example == 1 ? true : false,
			intro: p.feature.contribution_intro == 1 ? true : false,
			closeup: p.feature.contribution_closeup == 1 ? true : false,

		} )

	}

	constructor ( props ) {

		super ( props )

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

		const options = map( materials, ( material ) => {

			let checked = material.value == contribution_material ? true : false
			return { label: material.label, value: material.value, checked: checked }

		} )

		const yesNo = [

			{ label: 'Yes', value: '1' },
			{ label: 'No', value: '0' }

		]

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
					<DIV className={ style.top } style={ { backgroundImage: 'url("uploads/' + contribution_uid +'.jpg")' } } ></DIV>
					<FORM id={ formID } action="#" className={ style.form }>
						<INPUT form={ formID } type="hidden" name="contribution_id" value={ contribution_id + '' } />
						<P>ID: { contribution_id }</P>
						<P>Material user: { contribution_material }</P>
						<SELECTGROUP preferPlaceholder={ false } form={ formID } label="Material verified" name="contribution_material_verified" options={ options } value={ materialVerified } onChange={ this._setMaterial.bind( this ) } /><BR/>
						<RADIOGROUP preferPlaceholder={ false } checked={ verified } label="Verified" form={ formID } name="contribution_verified" options={ yesNo } value={ verified } onChange={ this._setVerified.bind( this ) } /><BR/>
						<RADIOGROUP preferPlaceholder={ false } checked={ closeup } label="Closeup" form={ formID } name="contribution_closeup" options={ yesNo } value={ closeup } onChange={ this._setCloseup.bind( this ) } /><BR/>
						<RADIOGROUP preferPlaceholder={ false } checked={ example } label="Example" form={ formID } name="contribution_example" options={ yesNo } value={ example } onChange={ this._setExample.bind( this ) } /><BR/>
						<RADIOGROUP preferPlaceholder={ false } checked={ intro } label="Intro" form={ formID } name="contribution_intro" options={ yesNo } value={ intro } onChange={ this._setIntro.bind( this ) } /><BR/>
					</FORM>
					<DIV className={ style.actions }>
						<GO onClick={ updateContribution.bind( this, formID ) } label="UPDATE" className={ style.update } />
						<GO onClick={ deleteContribution.bind( this, contribution_id, contribution_uid ) } label="DELETE" className={ style.delete } />
					</DIV>

				</DIV>

			)

		}

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