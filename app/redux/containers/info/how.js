import { connect } from 'react-redux'

import HOW from 'components/info/how'

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