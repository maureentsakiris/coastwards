import { connect } from 'react-redux'
import { validateImage } from 'actions/file'

import FILE from 'components/file'


const mapStateToProps = ( state ) => {

	return {


	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		validateImage: ( image ) => {

			dispatch( validateImage ( image ) )

		}

	}

}


const file = connect(

	mapStateToProps,
	mapDispatchToProps

)( FILE )

export default file