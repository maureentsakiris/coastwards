import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import style from './_styleFAQs';

const messages = defineMessages( {

	faqs_headline:{
		id: "faqs_headline",
		description: "0 - ",
		defaultMessage: "FAQs"
	}

} );

class FAQs extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const { formatMessage } = this.props.intl;

		return (

			<div className={ style.faqs }>
				<h2>{ formatMessage( messages.faqs_headline ) }</h2>
			</div>

		)

	}

}

FAQs.propTypes = {

	intl: intlShape.isRequired

};

FAQs.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( FAQs );
