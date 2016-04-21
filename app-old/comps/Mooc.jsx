import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { /*defineMessages,*/ injectIntl, intlShape/*, FormattedMessage*/ } from 'react-intl';

/*const messages = defineMessages( {

} );*/

class Mooc extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		/*const { formatMessage } = this.props.intl;*/

		return (

			<div className="mooc-card mdl-card mdl-shadow--2dp" >
			</div>
		)

	}

}

Mooc.propTypes = {

	intl: intlShape.isRequired

};

Mooc.defaultProps = {

	

};

Mooc.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Mooc );
