import { connect } from 'react-redux'
import { fetch, setMaterial, setVerified } from 'actions/admin/admin'

import ADMIN from 'components/admin/admin'


const mapStateToProps = ( state ) => {

	return {

		results: state.form.results,
		materials: state.materials, 
		material: state.form.material

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		setMaterial: ( e ) => {

			dispatch( setMaterial( e ) )
			//dispatch( fetch() )

		},
		setVerified: ( e ) => {

			dispatch( setVerified( e ) )
			//dispatch( fetch() )

		},
		fetch: ( ) => {

			dispatch( fetch() )

		}

	}

}


const admin = connect(

	mapStateToProps,
	mapDispatchToProps

)( ADMIN )

export default admin