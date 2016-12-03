import { connect } from 'react-redux'

import ASK from 'components/info/ask'

const mapStateToProps = ( state ) => {

	const { jazzSupported } = state.browser

	return {

		jazzSupported: jazzSupported

	}

}


const ask = connect(

	mapStateToProps,
	null

)( ASK )

export default ask