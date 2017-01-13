import React, { PropTypes } from 'react'
import _ from 'underscore'

import LI from 'components/tags/li'
import DIV from 'components/tags/div'
import IMG from 'components/tags/img'
import GO from 'components/form/button/go'

import FORM from 'components/tags/form'
import SELECTGROUP from 'components/form/selectgroup/selectgroup'

import style from './_contribution'

const contribution = ( { result, materials, deleteContribution } ) => {

	const { contribution_id, contribution_uid, contribution_material } = result

	const src = "uploads/" + contribution_uid + ".jpg"

	const options = _.map( materials, ( material ) => {

		let checked = material.value == contribution_material ? true : false
		return { label: material.label, value: material.value, checked: checked }

	} )

	const formID = "contribution_" + contribution_id

	return(

		<LI className={ style.contribution }>
			<IMG className={ style.image } src={ src } alt={ contribution_uid } />
			<FORM id={ formID } action="#" className={ style.form }>
				<SELECTGROUP form="Admin" label="Material" name="material" preferPlaceholder={ true } options={ options } onChange={ deleteContribution } value={ contribution_material } />
			</FORM>
			<DIV className={ style.actions }>
				<GO onClick={ deleteContribution.bind( this, contribution_id ) } label="UPDATE" className={ style.update } />
				<GO onClick={ deleteContribution.bind( this, contribution_id ) } label="DELETE" className={ style.delete } />
			</DIV>
		</LI>

	)

}

contribution.propTypes = {

	result: PropTypes.object,

	materials: PropTypes.array,

	deleteContribution: PropTypes.func

}

export default contribution