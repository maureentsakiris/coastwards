import React, { PropTypes } from 'react'

import LI from 'components/tags/li'
import IMG from 'components/tags/img'
import GO from 'components/form/button/go'

import style from './_contribution'

const contribution = ( { result, deleteContribution } ) => {

	const { contribution_id, contribution_uid } = result

	const src = "uploads/" + contribution_uid + ".jpg"

	return(

		<LI className={ style.contribution }>
			<IMG className={ style.image } src={ src } alt={ contribution_uid } />
			<GO onClick={ deleteContribution.bind( this, contribution_id ) } label="DELETE" className={ style.delete } />
		</LI>

	)

}

contribution.propTypes = {

	deleteContribution: PropTypes.func,

	result: PropTypes.object

}

export default contribution