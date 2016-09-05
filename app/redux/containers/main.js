import { connect } from 'react-redux'
import MAIN from 'components/main'


const mapStateToProps = ( state ) => {


	return {

		uploadSupported: state.browser.uploadSupported

	}

}


const main = connect(

	mapStateToProps,
	null

)( MAIN )

export default main