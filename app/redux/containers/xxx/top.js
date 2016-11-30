import { connect } from 'react-redux'
import TOP from 'components/top'
import { clipPage } from 'actions/main'


const mapStateToProps = ( state ) => {


	return {

		clipped: state.clipped

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		clipPage: ( e ) => {

			e.preventDefault()
			dispatch( clipPage() )

		}

	}

}


const top = connect(

	mapStateToProps,
	mapDispatchToProps

)( TOP )

export default top