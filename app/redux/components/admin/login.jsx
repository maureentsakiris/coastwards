import React from 'react'
import DIV from 'components/tags/div'
import A from 'components/tags/a'

import style from './_admin'

const login = ( ) => {

	return(

		<DIV className={ style.corset } >
			<A href="/login/github">Login with GitHub</A>
		</DIV>

	)

}

export default login