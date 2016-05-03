import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import style from './_styleTeam';

const messages = defineMessages( {

	team_headline:{
		id: "team_headline",
		description: "0 - ",
		defaultMessage: "Team"
	}

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

		return (

			<div className={ style.team }>
				<h2>{ formatMessage( messages.team_headline ) }</h2>
			</div>

		)

	}

}

Team.propTypes = {

	intl: intlShape.isRequired

};

Team.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Team );
