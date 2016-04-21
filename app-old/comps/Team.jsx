import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { /*defineMessages,*/ injectIntl, intlShape/*, FormattedMessage*/ } from 'react-intl';

/*const messages = defineMessages( {

} );*/

class Team extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		/*const { formatMessage } = this.props.intl;*/

		return (

			<div className="team-card mdl-card mdl-shadow--2dp">
				<div className="mdl-card__title mdl-card--expand">
					<h2 className="mdl-card__title-text">Team</h2>
				</div>
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
