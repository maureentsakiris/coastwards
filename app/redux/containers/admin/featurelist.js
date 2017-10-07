import { connect } from 'react-redux'
import { fetch } from 'actions/admin/admin'
import FEATURELIST from 'components/admin/featurelist'

const mapStateToProps = ( state ) => {

	return {

		results: state.form.results

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		fetch: ( ) => {

			dispatch( fetch() )

		}

	}

}


const featurelist = connect(

	mapStateToProps,
	mapDispatchToProps

)( FEATURELIST )

export default featurelist