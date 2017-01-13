import { connect } from 'react-redux'
import { fetch, setMaterial } from 'actions/admin/admin'

import ADMIN from 'components/admin/admin'


const mapStateToProps = ( state ) => {

	return {

		results: state.form.results

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		fetch: ( e ) => {

			e.preventDefault()
			dispatch( fetch( e ) )

		},
		setMaterial: ( e ) => {

			dispatch( setMaterial( e ) )

		}
	}

}


const admin = connect(

	mapStateToProps,
	mapDispatchToProps

)( ADMIN )

export default admin