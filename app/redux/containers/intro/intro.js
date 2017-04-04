import { connect } from 'react-redux'
import INTRO from 'components/intro/intro'
import { getIntro } from 'actions/main/main'


const mapStateToProps = ( state ) => {

	return {

		images: state.intro

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		getIntro: ( ) => {

			dispatch( getIntro() )

		}

	}

}


const intro = connect(

	mapStateToProps,
	mapDispatchToProps

)( INTRO )

export default intro