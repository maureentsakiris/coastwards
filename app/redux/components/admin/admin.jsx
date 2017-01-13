import React, { PropTypes } from 'react'
import _ from 'underscore'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import UL from 'components/tags/ul'
import HR from 'components/tags/hr'

import FORM from 'components/tags/form'
import RADIOGROUP from 'components/form/radiogroup/radiogroup'
import SUBMIT from 'components/form/button/submit'

import CONTRIBUTION from 'containers/admin/contribution'

import style from './_admin'

const admin = ( { results, fetch, setMaterial } ) => {

	const materials = [

		{ label: 'Sand', value: 'sand' },
		{ label: 'Pebble', value: 'pebble' },
		{ label: 'Rock', value: 'rock' },
		{ label: 'Mud', value: 'mud' },
		{ label: 'Ice', value: 'ice' },
		{ label: 'Man-made', value: 'manmade' },
		{ label: 'Not sure', value: 'notsure' }

	]

	const list = _renderResults( results )

	return(

		<DIV className={ style.corset } >
			<A href="/logout">Logout</A>
			<FORM className={ style.form } id="Admin" action="/admin/fetch" >
				<RADIOGROUP form="Admin" label="Material" name="material" options={ materials } preferPlaceholder={ false }  onClick={ setMaterial } />
				<SUBMIT form="Admin" name="submit" label="Submit" onClick={ fetch } />
			</FORM>
			<HR className={ style.divider } />
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

	fetch: PropTypes.func,
	setMaterial: PropTypes.func

}

export default admin