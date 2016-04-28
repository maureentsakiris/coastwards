import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Classnames from 'classnames';

import style from './_styleFAQs';

const messages = defineMessages( {

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
		const cls = Classnames( style.corset, style.pad, style.how );

		return (

			<div className={ cls }>
				<p>FAQs</p>
			</div>

		)

	}

}

FAQs.propTypes = {

	intl: intlShape.isRequired

};

FAQs.defaultProps = {

	

};

FAQs.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( FAQs );
