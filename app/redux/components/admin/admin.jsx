import React, { PropTypes } from 'react'
import _ from 'underscore'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import UL from 'components/tags/ul'

import FORM from 'components/tags/form'
import SELECTGROUP from 'components/form/selectgroup/selectgroup'
import GO from 'components/form/button/go'

import CONTRIBUTION from 'containers/admin/contribution'

import style from './_admin'

const admin = ( { results, materials, material, materialverified, verified, setMaterial, setMaterialVerified, setVerified, fetch } ) => {

	const all = [ { label: 'All', value: '%' } ]
	const mats = _.map( materials, ( material ) => {

		return { label: material.label, value: material.value }

	} )

	const materialOptions = all.concat( mats )

	const list = _renderResults( results )

	const verifiedOptions = [

		{ label: 'All', value: '%' },
		{ label: 'Yes', value: '1' },
		{ label: 'No', value: '0' }

	]

	/*<CHECKBOX form="Admin" label="Verified" name="verified" preferPlaceholder={ false } value="1" onChange={ setVerified } />*/

	return(

		<DIV className={ style.corset } >
			<A target="_self" href="/logout" className={ style.logger }>Logout</A>
			<FORM className={ style.form } id="Admin" action="/admin/fetch" >
				<SELECTGROUP form="Admin" label="Material" name="material" preferPlaceholder={ false } options={ materialOptions } onChange={ setMaterial } value={ material } />
				<SELECTGROUP form="Admin" label="Material verified" name="materialverified" preferPlaceholder={ false } options={ materialOptions } onChange={ setMaterialVerified } value={ materialverified } />
				<SELECTGROUP form="Admin" label="Verified" name="verified" preferPlaceholder={ false } options={ verifiedOptions } onChange={ setVerified } value={ verified } />
				
				<GO onClick={ fetch } label="GO" />
			</FORM>
			<UL>{ list }</UL>
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

	setMaterial: PropTypes.func,
	setMaterialVerified: PropTypes.func,
	setVerified: PropTypes.func,
	fetch: PropTypes.func

}

export default admin