import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { /*defineMessages,*/ injectIntl, intlShape/*, FormattedMessage*/ } from 'react-intl';

/*const messages = defineMessages( {

} );*/

class Footer extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		/*const { formatMessage } = this.props.intl;*/

		return (

			<footer className="footer mdl-mini-footer">
				<div className="mdl-mini-footer__left-section">
				<div className="mdl-logo">Title</div>
					<ul className="mdl-mini-footer__link-list">
						<li><a href="#">Help</a></li>
						<li><a href="#">Privacy & Terms</a></li>
					</ul>
				</div>
			</footer>

		)

	}

}

Footer.propTypes = {

	intl: intlShape.isRequired

};

Footer.defaultProps = {

	

};

Footer.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Footer );
