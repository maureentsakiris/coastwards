import { connect } from 'react-redux'
import { fetch, setMaterial, setMaterialVerified, setVerified } from 'actions/admin/admin'

import ADMIN from 'components/admin/admin'


const mapStateToProps = ( state ) => {

	return {

		results: state.form.results,
		materials: state.materials, 
		material: state.form.material,
		materialverified: state.form.materialverified

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		setMaterial: ( e ) => {

			dispatch( setMaterial( e ) )

		},
		setMaterialVerified: ( e ) => {

			dispatch( setMaterialVerified( e ) )

		},
		setVerified: ( e ) => {

			dispatch( setVerified( e ) )

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