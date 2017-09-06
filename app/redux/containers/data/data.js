import { connect } from 'react-redux'
import { setFilter, downloadCSV } from 'actions/data/data'

import DATA from 'components/data/data'


const mapStateToProps = ( state ) => {

	return {

		materials: state.materials, 
		material: state.form.material,
		materialverified: state.form.materialverified,
		verified: state.form.verified,
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
		downloadCSV: ( e, type ) => {

			dispatch( downloadCSV( e, type ) )

		}

	}

}


const data = connect(

	mapStateToProps,
	mapDispatchToProps

)( DATA )

export default data