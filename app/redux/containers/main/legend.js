import { connect } from 'react-redux'
import LEGEND from 'components/main/legend'


const mapStateToProps = ( state ) => {

	return {

		show: state.useraction == 'browsing',
		materials: state.materials

	}

}


const legend = connect(

	mapStateToProps

)( LEGEND )

export default legend