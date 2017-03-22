import { connect } from 'react-redux'
import DEFINEMATERIAL from 'components/ui/dialogs/definematerial'

const mapStateToProps = ( state ) => {

	return {

		materials: state.materials

	}

}

const definematerial = connect(

	mapStateToProps

)( DEFINEMATERIAL )

export default definematerial