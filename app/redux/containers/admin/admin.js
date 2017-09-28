import { connect } from 'react-redux'
import { setFilter, importRivagesCSV } from 'actions/admin/admin'

import ADMIN from 'components/admin/admin'


const mapStateToProps = ( state ) => {

	return {

		rivages: state.rivages,
		spinner: state.spinner,
		materials: state.materials, 
		material: state.form.material,
		materialverified: state.form.materialverified,
		verified: state.form.verified,
		example: state.form.example,
		intro: state.form.intro,
		id: state.form.id,
		closeup: state.form.closeup,
		pointmanual: state.form.pointmanual,
		pointcorrected: state.form.pointcorrected

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		setFilter: ( e, type ) => {

			dispatch( setFilter( e, type ) )

		},
		importRivagesCSV: ( e ) => {

			dispatch( importRivagesCSV( e ) )

		}

	}

}


const admin = connect(

	mapStateToProps,
	mapDispatchToProps

)( ADMIN )

export default admin