import { connect } from 'react-redux'
import LOADER from 'components/main/loader'

const mapStateToProps = ( state ) => {

	return {

		show: state.layers.loader

	}

}

const loader = connect(

	mapStateToProps

)( LOADER )

export default loader