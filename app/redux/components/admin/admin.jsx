import React from 'react'
import { PropTypes } from 'prop-types'
import { chain } from 'underscore'
import ClassNames from 'classnames'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
//import P from 'components/tags/p'
import H from 'components/tags/h'

import FORM from 'components/tags/form'
import INPUT from 'components/form/input/input'
import TOGGLE from 'components/ui/toggle'
import ICONRADIOGROUP from 'components/form/radiogroup/iconradiogroup'
//import GO from 'components/form/button/go'

//import CONTRIBUTION from 'containers/admin/contribution'
import Mapbox from 'containers/admin/mapbox'
import Popup from 'containers/admin/popup'

import style from './_admin'

const admin = ( { /*showForm,*/ /*results,*/ materials, material, materialverified, verified, id, example, intro, closeup, pointmanual, pointcorrected, setMaterial, setMaterialVerified, setVerified, setID, setExample, setIntro, setCloseup, setPointManual, setPointCorrected, fetch/*, toggleFormVisibility*/ } ) => {

	const all = [ { label: 'All', value: '%' } ]
	const mats = chain( materials )
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

	/*const clsForm = ClassNames( style.corset, {

		[ style.hide ]: !showForm

	} )*/

	const clsLogger = ClassNames( style.link, style.logger )
	//const clsToggle = ClassNames( style.link, style.toggle )

	//console.log( results );

	//const noresults = results === null ? true : false;

	/*const list = _renderResults( results )

	const noresults = results && list.length == 0*/


	/*<CHECKBOX form="Admin" label="Verified" name="verified" preferPlaceholder={ false } value="1" onChange={ setVerified } />*/
	/*<Mapbox className={ style.mapbox } />*/

	/*<GO className={ style.go } onClick={ fetch } label="GO" />
					{ noresults && <P className={ style.noresults } >Sorry, no results</P> }*/

	/*<DIV className={ style.toolbar } >
				<A target="_self" href="/logout" className={ clsLogger } >Logout</A>
				<A target="_self" onClick={ toggleFormVisibility } className={ clsToggle } >Show/Hide Form</A>
			</DIV>*/
	return(

		<DIV className={ style.admin }>
			<Popup />
			<DIV className={ style.form } >
				<A target="_self" href="/logout" className={ clsLogger } >Logout</A>
				<FORM id="Admin" action="javascript:;" onSubmit={ fetch } >
					<H priority={ 1 } >Hi there! Go ahead, make your selection...</H>
					<ICONRADIOGROUP form="Admin" label="Verified: " name="verified" preferPlaceholder={ false } options={ allYesNo } onClick={ setVerified } checkedValue={ verified } />
					<TOGGLE priority={ 4 } className={ style.toggle } text="Other filters" >
						<INPUT form="Admin" label="ID: " name="id" preferPlaceholder={ false } placeholder="ID" onChange={ setID } checkedValue={ id } />
						<ICONRADIOGROUP form="Admin" label="Material contributor: " name="material" preferPlaceholder={ false } options={ materialOptions } onClick={ setMaterial } checkedValue={ material } />
						<ICONRADIOGROUP form="Admin" label="Material verified: " name="materialverified" preferPlaceholder={ false } options={ materialOptions } onClick={ setMaterialVerified } checkedValue={ materialverified } />
						<ICONRADIOGROUP form="Admin" label="Position manual: " name="pointmanual" preferPlaceholder={ false } options={ allYesNo } onClick={ setPointManual } checkedValue={ pointmanual } />
						<ICONRADIOGROUP form="Admin" label="Position corrected: " name="pointcorrected" preferPlaceholder={ false } options={ allYesNo } onClick={ setPointCorrected } checkedValue={ pointcorrected } />
						<ICONRADIOGROUP form="Admin" label="Closeup: " name="closeup" preferPlaceholder={ false } options={ allYesNo } onClick={ setCloseup } checkedValue={ closeup } />
						<ICONRADIOGROUP form="Admin" label="Intro: " name="intro" preferPlaceholder={ false } options={ allYesNo } onClick={ setIntro } checkedValue={ intro } />
						<ICONRADIOGROUP form="Admin" label="Example: " name="example" preferPlaceholder={ false } options={ allYesNo } onClick={ setExample } checkedValue={ example } />
					</TOGGLE>
				</FORM>
			</DIV>
			<Mapbox className={ style.mapbox } />
		</DIV>

	)

}

admin.propTypes = {

	showForm: PropTypes.bool,
	results: PropTypes.object,
	materials: PropTypes.array,
	material: PropTypes.string,
	materialverified: PropTypes.string,
	verified: PropTypes.string,
	id: PropTypes.string,
	example: PropTypes.string,
	intro: PropTypes.string,
	closeup: PropTypes.string,
	pointmanual: PropTypes.string,
	pointcorrected: PropTypes.string,

	setMaterial: PropTypes.func,
	setMaterialVerified: PropTypes.func,
	setVerified: PropTypes.func,
	setID: PropTypes.func,
	setExample: PropTypes.func,
	setIntro: PropTypes.func,
	setCloseup: PropTypes.func,
	setPointManual: PropTypes.func,
	setPointCorrected: PropTypes.func,
	fetch: PropTypes.func,
	toggleFormVisibility: PropTypes.func

}

export default admin