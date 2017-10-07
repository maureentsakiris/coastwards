import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { promiseGet, promiseJSONOK } from 'actions/util/request/get'

import DIV from 'components/tags/div'

import { map } from 'underscore'
import { unescape } from 'validator'


import P from 'components/tags/p'
import HR from 'components/tags/hr'
import A from 'components/tags/a'

import FORM from 'components/tags/form'
import INPUT from 'components/tags/input'
import SELECTGROUP from 'components/form/selectgroup/selectgroup'
import RADIOGROUP from 'components/form/radiogroup/radiogroup'
// import GO from 'components/form/button/go'

import style from './_feature'


class feature extends Component {

	static propTypes = {

		properties: PropTypes.object,
		tabs: PropTypes.object,
		materials: PropTypes.array,

		deleteContribution: PropTypes.func,
		updateContribution: PropTypes.func

	}

	componentDidMount ( ) {

		promiseGet( '/administrate/' + this.props.properties.id )
			.then( JSON.parse )
			.then( promiseJSONOK )
			.then( ( parsed ) => {

				const feature = parsed.json
				this.feature = feature
				this.setState( { 

					verified: feature.contribution_verified == 1 ? true : false,
					materialVerified: feature.contribution_material_verified ?  feature.contribution_material_verified : 'notset',
					example: feature.contribution_example == 1 ? true : false,
					intro: feature.contribution_intro == 1 ? true : false,
					closeup: feature.contribution_closeup == 1 ? true : false

				} )

				return feature

			} )
			.catch( ( error ) => {

				console.log( error )

			} )

	}

	constructor ( props ) {

		super ( props )

	}

	render () {

		const { properties, tabs, materials, deleteContribution, updateContribution } = this.props
		const { id, materialverified } = properties

		if( !this.feature ){

			return (

				<DIV>{ id }</DIV>

			)

		}else{

			const { contribution_id, contribution_uid, contribution_material, contribution_comment, contribution_source } = this.feature

			const { verified, materialVerified, example, intro, closeup } = this.state

			const options = map( materials, ( material ) => {

				let checked = material.value == contribution_material ? true : false
				return { label: material.label, value: material.value, checked: checked }

			} )

			const yesNo = [

				{ label: 'Yes', value: '1' },
				{ label: 'No', value: '0' }

			]

			const url = "uploads/" + contribution_uid + ".jpg"
			const formID = "contribution_" + contribution_id
			const usercomment = unescape( contribution_comment )

			return(

				<DIV className={ style.feature } >
					<DIV className={ style.bar }>
						<A href={ url } className="material-icons">open_in_new</A>
					</DIV>
					<DIV className={ style.image } style={ { backgroundImage: 'url("' + url +'")' } } ></DIV>
					<FORM id={ formID } action="#" className={ style.form }>
						<INPUT form={ formID } type="hidden" name="contribution_id" value={ contribution_id + '' } />
						<P>{ contribution_id } / { contribution_material }</P>
						<HR />
						{ tabs.material && <SELECTGROUP preferPlaceholder={ false } form={ formID } label="Material verified:" name="contribution_material_verified" options={ options } value={ materialVerified } onChange={ this._setMaterial.bind( this ) } /> }
						{ tabs.verified && <RADIOGROUP preferPlaceholder={ false } checked={ verified } label="Verified:" form={ formID } name="contribution_verified" options={ yesNo } value={ verified } onChange={ this._setVerified.bind( this ) } /> }
						{ tabs.closeup && <RADIOGROUP preferPlaceholder={ false } checked={ closeup } label="Closeup:" form={ formID } name="contribution_closeup" options={ yesNo } value={ closeup } onChange={ this._setCloseup.bind( this ) } /> }
						{ tabs.example && <RADIOGROUP preferPlaceholder={ false } checked={ example } label="Example:" form={ formID } name="contribution_example" options={ yesNo } value={ example } onChange={ this._setExample.bind( this ) } /> }
						{ tabs.intro && <RADIOGROUP preferPlaceholder={ false } checked={ intro } label="Intro:" form={ formID } name="contribution_intro" options={ yesNo } value={ intro } onChange={ this._setIntro.bind( this ) } /> }
						{ tabs.comment && <P className={ style.comment } >{ usercomment }</P> }
					</FORM>
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

export default feature