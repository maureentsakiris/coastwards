import { connect } from 'react-redux'
import MAIN from 'components/main'


const mapStateToProps = ( state ) => {


	return {

		uploadSupported: state.browser.uploadSupported,
		jazzSupported: state.browser.jazzSupported

	}

}


const main = connect(

	mapStateToProps,
	null

)( MAIN )

export default main