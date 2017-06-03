import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
//import PureRenderMixin from 'react-addons-pure-render-mixin'
import _ from 'underscore'

import LI from 'components/tags/li'
import DIV from 'components/tags/div'
import IMG from 'components/tags/img'
import GO from 'components/form/button/go'
import P from 'components/tags/p'

import FORM from 'components/tags/form'
import INPUT from 'components/tags/input'
import SELECTGROUP from 'components/form/selectgroup/selectgroup'
import RADIOGROUP from 'components/form/radiogroup/radiogroup'

import style from './_contribution'

class contribution extends Component {

	static propTypes = {

		result: PropTypes.object,

		materials: PropTypes.array,

		deleteContribution: PropTypes.func,
		updateContribution: PropTypes.func

	}

	componentWillReceiveProps ( p ){

		this.setState( { 

			verified: p.result.contribution_verified == 1 ? true : false,
			materialVerified: p.result.contribution_material_verified ?  p.result.contribution_material_verified : p.result.contribution_material,
			example: p.result.contribution_example == 1 ? true : false,
			intro: p.result.contribution_intro == 1 ? true : false,
			closeup: p.result.contribution_closeup == 1 ? true : false,

		} )

	}

	constructor ( props ) {

		super ( props )
		//this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

		this.state = {

			verified: this.props.result.contribution_verified == 1 ? "1" : "0",
			materialVerified: this.props.result.contribution_material_verified ?  this.props.result.contribution_material_verified : this.props.result.contribution_material,
			example: this.props.result.contribution_example == 1 ? "1" : "0",
			intro: this.props.result.contribution_intro == 1 ? "1" : "0",
			closeup: this.props.result.contribution_closeup == 1 ? "1" : "0"

		}

	}

	render () {

		const { result, materials, deleteContribution, updateContribution } = this.props
		const { contribution_id, contribution_uid, contribution_material } = result

		const { verified, materialVerified, example, intro, closeup } = this.state


		const options = _.map( materials, ( material ) => {

			let checked = material.value == contribution_material ? true : false
			return { label: material.label, value: material.value, checked: checked }

		} )

		const formID = "contribution_" + contribution_id

		/*<CHECKBOX label="Verified" form={ formID } name="contribution_verified" value="1" onChange={ this._setVerified.bind( this ) } checked={ verified } />*/

		return(

			<LI className={ style.contribution }>
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
			</LI>

		)

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

export default contribution