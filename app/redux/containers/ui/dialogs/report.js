import { connect } from 'react-redux'
import REPORT from 'components/ui/dialogs/report'


const mapStateToProps = ( state ) => {

	return {

		feature: state.popup.feature

	}

}

const report = connect(

	mapStateToProps

)( REPORT )

export default report