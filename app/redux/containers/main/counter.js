import { connect } from 'react-redux'
import COUNTER from 'components/main/counter'
import { getCount } from 'actions/main/main'


const mapStateToProps = ( state ) => {

	return {

		count: state.count,
		show: state.layers.counter

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		getCount: ( ) => {

			dispatch( getCount() )
			setInterval( ( ) => {

				dispatch( getCount() )

			}, 5000 )

		}

	}

}


const counter = connect(

	mapStateToProps,
	mapDispatchToProps

)( COUNTER )

export default counter