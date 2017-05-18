import { connect } from 'react-redux'
import { fetch, setMaterial, setMaterialVerified, setVerified, setID, setExample, setIntro, setCloseup, toggleFormVisibility } from 'actions/admin/admin'

import ADMIN from 'components/admin/admin'


const mapStateToProps = ( state ) => {

	return {

		showForm: state.form.show,
		results: state.form.results,
		materials: state.materials, 
		material: state.form.material,
		materialverified: state.form.materialverified,
		verified: state.form.verified,
		example: state.form.example,
		intro: state.form.intro,
		id: state.form.id,
		closeup: state.form.closeup

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
		setID: ( e ) => {

			dispatch( setID( e ) )

		},
		setExample: ( e ) => {

			dispatch( setExample( e ) )

		},
		setIntro: ( e ) => {

			dispatch( setIntro( e ) )

		},
		setCloseup: ( e ) => {

			dispatch( setCloseup( e ) )

		},
		fetch: ( ) => {

			dispatch( fetch() )

		},
		toggleFormVisibility: ( ) => {

			dispatch( toggleFormVisibility() )

		}

	}

}


const admin = connect(

	mapStateToProps,
	mapDispatchToProps

)( ADMIN )

export default admin