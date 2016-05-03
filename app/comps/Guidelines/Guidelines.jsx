import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import style from './_styleGuidelines';

const messages = defineMessages( {

	guidelines_header:{
		id: "guidelines_header",
		description: "1 - ",
		defaultMessage: "No."
	},
	guidelines_tagline:{
		id: "guidelines_tagline",
		description: "1 - ",
		defaultMessage: "This is science .. you want us to be picky."
	}

} );

class Guidelines extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const { formatMessage } = this.props.intl;

		return (

			<div className={ style.guidelines }>
				<h2>{ formatMessage( messages.guidelines_header ) }</h2>
				<h3>{ formatMessage( messages.guidelines_tagline ) }</h3>
			</div>

		)

	}

}

Guidelines.propTypes = {

	intl: intlShape.isRequired

};

Guidelines.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Guidelines );
