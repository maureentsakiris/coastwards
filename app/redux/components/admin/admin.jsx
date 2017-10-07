import React from 'react'
import { PropTypes } from 'prop-types'
import { chain } from 'underscore'
import ClassNames from 'classnames'
import { groupBy, map } from 'underscore'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import UL from 'components/tags/ul'
import LI from 'components/tags/li'
import H from 'components/tags/h'

import FORM from 'components/tags/form'
import INPUT from 'components/form/input/input'
import TOGGLE from 'components/ui/toggle'
import ICONRADIOGROUP from 'components/form/radiogroup/iconradiogroup'
import FILE from 'components/form/input/file'

import Mapbox from 'containers/admin/mapbox'
import Popup from 'containers/admin/popup'
import Featurelist from 'containers/admin/featurelist'

import style from './_admin'

const admin = ( { rivages, spinner, materials, material, materialverified, verified, id, example, intro, closeup, pointmanual, pointcorrected, display, setFilter, importRivagesCSV } ) => {

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

	const listOrMap = [

		{ label: 'List', value: 'list' },
		{ label: 'Map', value: 'map' }

	]

	const clsLogger = ClassNames( style.link, style.logger )

	const rivagesGroups = groupBy( rivages )
	const rivagesResults = _renderRivagesResults( rivagesGroups, 'key' )


	const clsList = Classnames( {

		[ style.hide ]: display === 'map',
		[ style.show ]: display === 'list'

	} )

	return(

		<DIV className={ style.admin }>
			{ spinner && <DIV className={ style.cover } >
				<H priority={ 2 } >I'm on it! Please wait ...</H>
				<DIV className={ style.spinner }></DIV>
			</DIV> }
			<Popup />
			<DIV className={ style.options } >
				<A target="_self" href="/logout" className={ clsLogger } >Logout</A>
				<H priority={ 1 } >Hi there! Go ahead, make your selection...</H>
				<TOGGLE priority={ 3 } className={ style.toggle } text="Verify contributions" expanded={ true } >
					<FORM id="Admin" action="javascript:;" >
						<ICONRADIOGROUP form="Admin" label="Display as: " name="display" preferPlaceholder={ false } options={ listOrMap } onClick={ setFilter.bind( this, 'SET_DISPLAY' ) } checkedValue={ display } />
						<ICONRADIOGROUP form="Admin" label="Verified: " name="verified" preferPlaceholder={ false } options={ allYesNo } onClick={ setFilter.bind( this, 'SET_VERIFIED' ) } checkedValue={ verified } />
						<TOGGLE priority={ 4 } text="Other filters" >
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
				</TOGGLE>
				<TOGGLE priority={ 3 } className={ style.toggle } text="Import from Rivages" >
					<FORM id="Rivages" action="javascript:;" >
						<FILE form="Rivages" name="csv" onChange={ importRivagesCSV } accept=".csv" />
					</FORM>
					{ rivages && <UL>
						<H priority={ 2 } >Finished importing. Here are the results:</H>
						{ rivagesResults }
					</UL> }
				</TOGGLE>
			</DIV>
			<DIV className={ style.results } >
				<Mapbox  />
				<Featurelist className={ clsList } />
			</DIV>
		</DIV>

	)


}

const _renderRivagesResults = ( groups ) => {

	return map( groups, ( group, key ) => {

		return (

			<LI key={ key }>{ key }: { group.length }</LI>

		)

	} )

}


admin.propTypes = {

	rivages: PropTypes.array,
	spinner: PropTypes.bool,
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
	display: PropTypes.string,

	setFilter: PropTypes.func,
	importRivagesCSV: PropTypes.func

}

export default admin