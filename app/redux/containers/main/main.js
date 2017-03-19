import { connect } from 'react-redux'
import MAIN from 'components/main/main'
import { unclipPage } from 'actions/main/main'


const mapStateToProps = ( state ) => {


	return {

		uploadSupported: state.browser.uploadSupported,
		jazzSupported: state.browser.jazzSupported,
		useraction: state.useraction

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		unclipPage: ( e ) => {

			e.preventDefault()
			dispatch( unclipPage() )

		}

	}

}


const main = connect(

	mapStateToProps,
	mapDispatchToProps

)( MAIN )

export default main