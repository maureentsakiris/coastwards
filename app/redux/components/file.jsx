import React, { Component, PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'


const messages = defineMessages( {

	

} )

class file extends Component {

	componentWillMount ( ){

		this.props.validateImage( this.props.f )

	}

	constructor ( props ) {

		super ( props )

	}

	render () {

		const { formatMessage } = this.props.intl
		const { f } = this.props

		return(

			<div style={ { marginBottom: '10px' } } >
				<img style={ { width: '200px' } } src={ f.preview } />
			</div>

		)

	}

}


file.propTypes = {

	intl: intlShape.isRequired,
	f: PropTypes.object.isRequired,
	validateImage: PropTypes.func

}

export default injectIntl( file ) 