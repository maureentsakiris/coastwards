import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Classnames from 'classnames';

import style from './_styleHow';

import poster from '../../../public/assets/coastwards_red.png'; 

const messages = defineMessages( {

	how_headline:{
		id: "how_headline",
		description: "0 - ",
		defaultMessage: "How Does A Picture Help?"
	}

} );

class How extends Component {

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
				<div className={ style.videoWrapper }>
					<span></span>
				</div>
			</div>

		)

	}

}

How.propTypes = {

	intl: intlShape.isRequired

};

How.defaultProps = {

	

};

How.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( How );
