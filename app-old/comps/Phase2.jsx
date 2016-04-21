import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { /*defineMessages,*/ injectIntl, intlShape/*, FormattedMessage*/ } from 'react-intl';

/*const messages = defineMessages( {

} );*/

class Phase2 extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		/*const { formatMessage } = this.props.intl;*/

		return (

			<div className="phase2-card mdl-card mdl-shadow--2dp">
				<div className="mdl-card__title mdl-card--expand">
					<h2 className="mdl-card__title-text">Sign up for phase 2!</h2>
				</div>
			</div>

		)

	}

}

Phase2.propTypes = {

	intl: intlShape.isRequired

};

Phase2.defaultProps = {

	

};

Phase2.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Phase2 );
