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
import FILE from 'components/form/input/file'
//import GO from 'components/form/button/go'

//import CONTRIBUTION from 'containers/admin/contribution'
import Mapbox from 'containers/admin/mapbox'
import Popup from 'containers/admin/popup'

import style from './_admin'

const admin = ( { materials, material, materialverified, verified, id, example, intro, closeup, pointmanual, pointcorrected, setFilter, importRivagesCSV } ) => {

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

	const clsLogger = ClassNames( style.link, style.logger )

	return(

		<DIV className={ style.admin }>
			<Popup />
			<DIV className={ style.form } >
				<A target="_self" href="/logout" className={ clsLogger } >Logout</A>
				<FORM id="Admin" action="javascript:;" >
					<H priority={ 1 } >Hi there! Go ahead, make your selection...</H>
					<ICONRADIOGROUP form="Admin" label="Verified: " name="verified" preferPlaceholder={ false } options={ allYesNo } onClick={ setFilter.bind( this, 'SET_VERIFIED' ) } checkedValue={ verified } />
					<TOGGLE priority={ 4 } className={ style.toggle } text="Other filters" >
						<INPUT form="Admin" label="ID: " name="id" preferPlaceholder={ false } placeholder="ID" onChange={ setFilter.bind( this, 'SET_ID' ) } checkedValue={ id } />
						<ICONRADIOGROUP form="Admin" label="Material contributor: " name="material" preferPlaceholder={ false } options={ materialOptions } onClick={ setFilter.bind( this, 'SET_MATERIAL' ) } checkedValue={ material } />
						<ICONRADIOGROUP form="Admin" label="Material verified: " name="materialverified" preferPlaceholder={ false } options={ materialOptions } onClick={ setFilter.bind( this, 'SET_MATERIAL_VERIFIED' ) } checkedValue={ materialverified } />
						<ICONRADIOGROUP form="Admin" label="Position manual: " name="pointmanual" preferPlaceholder={ false } options={ allYesNo } onClick={ setFilter.bind( this, 'SET_POINTMANUAL' ) } checkedValue={ pointmanual } />
						<ICONRADIOGROUP form="Admin" label="Position corrected: " name="pointcorrected" preferPlaceholder={ false } options={ allYesNo } onClick={ setFilter.bind( this, 'SET_POINTCORRECTED' ) } checkedValue={ pointcorrected } />
						<ICONRADIOGROUP form="Admin" label="Closeup: " name="closeup" preferPlaceholder={ false } options={ allYesNo } onClick={ setFilter.bind( this, 'SET_CLOSEUP' ) } checkedValue={ closeup } />
						<ICONRADIOGROUP form="Admin" label="Intro: " name="intro" preferPlaceholder={ false } options={ allYesNo } onClick={ setFilter.bind( this, 'SET_INTRO' ) } checkedValue={ intro } />
						<ICONRADIOGROUP form="Admin" label="Example: " name="example" preferPlaceholder={ false } options={ allYesNo } onClick={ setFilter.bind( this, 'SET_EXAMPLE' ) } checkedValue={ example } />
					</TOGGLE>
				</FORM>
				<FORM id="Rivages" action="javascript:;" >
					<FILE form="Rivages" name="csv" onChange={ importRivagesCSV } accept=".csv" />
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

	setFilter: PropTypes.func,
	importRivagesCSV: PropTypes.func

}

export default admin