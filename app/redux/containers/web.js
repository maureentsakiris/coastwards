import { connect } from 'react-redux'
import WEB from 'components/web'
import { clipPage } from 'actions/main'


const mapStateToProps = ( state ) => {


	return {

		clipped: state.clipped

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		clipPage: ( e ) => {

			e.preventDefault()
			dispatch( clipPage() )

		}

	}

}


const web = connect(

	mapStateToProps,
	mapDispatchToProps

)( WEB )

export default web