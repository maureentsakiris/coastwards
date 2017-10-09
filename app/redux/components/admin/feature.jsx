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
//import SELECTGROUP from 'components/form/selectgroup/selectgroup'
import ICONRADIOGROUP from 'components/form/radiogroup/iconradiogroup'
import GO from 'components/form/button/go'

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

					verified: feature.contribution_verified.toString(),
					materialverified: feature.contribution_material_verified.toString(),
					example: feature.contribution_example.toString(),
					intro: feature.contribution_intro.toString(),
					closeup: feature.contribution_closeup.toString()

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
		const { id/*, materialverified*/ } = properties

		if( !this.feature ){

			return (

				<DIV>{ id }</DIV>

			)

		}else{

			const { contribution_id, contribution_uid, contribution_material, contribution_comment/*, contribution_source*/ } = this.feature

			const { verified, materialverified, example, intro, closeup } = this.state

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
						<INPUT form={ formID } type="hidden" name="id" value={ contribution_id + '' } />
						<P className={ style.id } >{ contribution_id } / { contribution_material }</P>
						<ICONRADIOGROUP style={ { display: tabs.material ? 'block' : 'none' } } preferPlaceholder={ false } form={ formID } label="Material verified: " name="material" options={ materialOptions } onChange={ this._setMaterialVerified.bind( this ) } selected={ materialverified } />
						<ICONRADIOGROUP style={ { display: tabs.verified ? 'block' : 'none' } } preferPlaceholder={ false } form={ formID } label="Verified:" name="verified" options={ yesNo } value={ verified } onChange={ this._setVerified.bind( this ) } selected={ verified } />
						<ICONRADIOGROUP style={ { display: tabs.closeup ? 'block' : 'none' } } preferPlaceholder={ false } form={ formID } label="Closeup:" name="closeup" options={ yesNoNotset } value={ closeup } onChange={ this._setCloseup.bind( this ) } selected={ closeup } />
						<ICONRADIOGROUP style={ { display: tabs.example ? 'block' : 'none' } } preferPlaceholder={ false } form={ formID } label="Example:" name="example" options={ yesNo } value={ example } onChange={ this._setExample.bind( this ) } selected={ example } />
						<ICONRADIOGROUP style={ { display: tabs.intro ? 'block' : 'none' } } preferPlaceholder={ false } form={ formID } label="Intro:" name="intro" options={ yesNo } value={ intro } onChange={ this._setIntro.bind( this ) } selected={ intro } />
						<P className={ style.comment } style={ { display: tabs.comment ? 'block' : 'none' } } >{ usercomment }</P>
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

		this.setState( { materialVerified: value } )

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

	_setMaterialVerified = ( value ) => {

		this.setState( { materialverified: value } )

	}

}

export default feature