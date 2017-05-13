import React, { PropTypes } from 'react'
import _ from 'underscore'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import P from 'components/tags/p'
import H from 'components/tags/h'

import FORM from 'components/tags/form'
import INPUT from 'components/form/input/input'
import TOGGLE from 'components/ui/toggle'
import ICONRADIOGROUP from 'components/form/radiogroup/iconradiogroup'
import GO from 'components/form/button/go'

import CONTRIBUTION from 'containers/admin/contribution'
import Mapbox from 'containers/admin/mapbox'

import style from './_admin'

const admin = ( { results, materials, material, materialverified, verified, id, example, intro, closeup, setMaterial, setMaterialVerified, setVerified, setID, setExample, setIntro, setCloseup, fetch } ) => {

	const all = [ { label: 'All', value: '%' } ]
	const mats = _.chain( materials )
	.filter( ( material ) => {

		let { value } = material
		return value !== 'notset'

	} )
	.filter( ( material ) => {

		let { value } = material
		return value !== 'notclose'

	} )
	.map( ( material ) => {

		let { value, color, label } = material
		return { label: label, value: value, color: color }

	} )
	.value()

	const materialOptions = all.concat( mats )

	const allYesNo = [

		{ label: 'All', value: '%' },
		{ label: 'Yes', value: '1' },
		{ label: 'No', value: '0' }

	]

	const list = _renderResults( results )

	const noresults = results && list.length == 0


	/*<CHECKBOX form="Admin" label="Verified" name="verified" preferPlaceholder={ false } value="1" onChange={ setVerified } />*/
	/*<Mapbox className={ style.mapbox } />*/
	return(

		<DIV>
			<DIV className={ style.toolbar } >
				<A target="_self" href="/logout" className={ style.logger }>Logout</A>
			</DIV>
			<DIV className={ style.corset } >
				<FORM className={ style.form } id="Admin" action="javascript:;" onSubmit={ fetch } >
				<H priority={ 1 } >Hi there! Go ahead, make your selection...</H>
					<ICONRADIOGROUP form="Admin" label="Verified: " name="verified" preferPlaceholder={ false } options={ allYesNo } onClick={ setVerified } checkedValue={ verified } />
					<TOGGLE priority={ 4 } className={ style.toggle } text="Other filters" >
						<INPUT form="Admin" label="ID: " name="id" preferPlaceholder={ false } placeholder="ID" onClick={ setID } checkedValue={ id } />
						<ICONRADIOGROUP form="Admin" label="Material contributor: " name="material" preferPlaceholder={ false } options={ materialOptions } onClick={ setMaterial } checkedValue={ material } />
						<ICONRADIOGROUP form="Admin" label="Material verified: " name="materialverified" preferPlaceholder={ false } options={ materialOptions } onClick={ setMaterialVerified } checkedValue={ materialverified } />
						<ICONRADIOGROUP form="Admin" label="Example: " name="example" preferPlaceholder={ false } options={ allYesNo } onClick={ setExample } checkedValue={ example } />
						<ICONRADIOGROUP form="Admin" label="Intro: " name="intro" preferPlaceholder={ false } options={ allYesNo } onClick={ setIntro } checkedValue={ intro } />
						<ICONRADIOGROUP form="Admin" label="Closeup: " name="closeup" preferPlaceholder={ false } options={ allYesNo } onClick={ setCloseup } checkedValue={ closeup } />
					</TOGGLE>
					{ !noresults && <GO className={ style.go } onClick={ fetch } label="GO" /> }
					{ noresults && <P className={ style.noresults } >Sorry, no results</P> }
				</FORM>
			</DIV>
			<Mapbox className={ style.mapbox } />
		</DIV>

	)

}

const _renderResults = ( results ) => {

	return _.map( results, ( result, key ) => {

		return React.createElement( CONTRIBUTION, {

			key: key,
			result: result

		} )

	} )

}

admin.propTypes = {

	results: PropTypes.array,
	materials: PropTypes.array,
	material: PropTypes.string,
	materialverified: PropTypes.string,
	verified: PropTypes.string,
	id: PropTypes.string,
	example: PropTypes.string,
	intro: PropTypes.string,
	closeup: PropTypes.string,

	setMaterial: PropTypes.func,
	setMaterialVerified: PropTypes.func,
	setVerified: PropTypes.func,
	setID: PropTypes.func,
	setExample: PropTypes.func,
	setIntro: PropTypes.func,
	setCloseup: PropTypes.func,
	fetch: PropTypes.func

}

export default admin