import { connect } from 'react-redux'

import { submit } from 'actions/ask'
import ASK from 'components/ask'


const mapStateToProps = ( state ) => {

	return {

		error: state.ask.error

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		submit: ( e ) => {

			e.preventDefault()
			dispatch( submit() )

		}

	}

}


const ask = connect(

	mapStateToProps,
	mapDispatchToProps

)( ASK )

export default ask