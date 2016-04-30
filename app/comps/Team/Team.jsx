import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Classnames from 'classnames';

import style from './_styleTeam';

const messages = defineMessages( {

} );

class Team extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const { formatMessage } = this.props.intl;
		const cls = Classnames( style.corset, style.pad, style.padContent );

		return (

			<div className={ cls }>
				<h2>Team</h2>
			</div>

		)

	}

}

Team.propTypes = {

	intl: intlShape.isRequired

};

Team.defaultProps = {

	

};

Team.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Team );
