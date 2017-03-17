import { connect } from 'react-redux'

import HOW from 'components/info/HOW'

const mapStateToProps = ( state ) => {

	const { jazzSupported } = state.browser

	return {

		jazzSupported: jazzSupported

	}

}


const how = connect(

	mapStateToProps

)( HOW )

export default how