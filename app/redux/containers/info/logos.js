import { connect } from 'react-redux'
import LOGOS from 'components/info/logos'

const mapStateToProps = ( state ) => {

	const { jazzSupported } = state.browser

	return {

		jazzSupported: jazzSupported

	}

}

const logos = connect(

	mapStateToProps

)( LOGOS )

export default logos