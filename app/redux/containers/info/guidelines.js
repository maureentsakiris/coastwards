import { connect } from 'react-redux'

import GUIDELINES from 'components/info/guidelines'

const mapStateToProps = ( state ) => {

	const { jazzSupported } = state.browser

	return {

		jazzSupported: jazzSupported

	}

}


const guidelines = connect(

	mapStateToProps,
	null

)( GUIDELINES )

export default guidelines