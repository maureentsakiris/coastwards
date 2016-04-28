import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Classnames from 'classnames';

import style from './_styleGuidelines';

const messages = defineMessages( {

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
		const cls = Classnames( style.corset, style.pad, style.guidelines );

		return (

			<div className={ cls }>
				<p>Guidelines</p>
			</div>

		)

	}

}

Guidelines.propTypes = {

	intl: intlShape.isRequired

};

Guidelines.defaultProps = {

	

};

Guidelines.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Guidelines );
