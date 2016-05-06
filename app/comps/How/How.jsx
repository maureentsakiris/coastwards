import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { /*defineMessages,*/ injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';

import style from './_styleHow';

/*const messages = defineMessages( {

	how_headline:{
		id: "how_headline",
		description: "0 - ",
		defaultMessage: "How Does A Picture Help?"
	},
	show_transcript:{
		id: "show_transcript",
		description: "1 - ",
		defaultMessage: "Show transcript"
	}

} );*/

class How extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		/*const { formatMessage } = this.props.intl;*/
		const { className } = this.props;

		const cls = Classnames( style.how, className );

		return (

			<div id="How" className={ cls }>
				<div id="Video" className={ style.videoWrapper }>
					<iframe></iframe>
				</div>
			</div>

		)

	}

}

How.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string

};

How.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( How );
