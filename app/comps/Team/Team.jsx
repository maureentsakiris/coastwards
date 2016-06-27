import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';

import style from './_styleTeam';

/*import FormTB from '../../utils/FormTB/FormTB/FormTB';
import DropzoneTB from '../../utils/FormTB/DropzoneTB/DropzoneTB';*/

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
		const { className } = this.props;

		const cls = Classnames( style.team, className );

		/*				<FormTB name="test">
					<DropzoneTB
						name="dropzoneTest"
					/>
				</FormTB>*/

		return (

			<div id="Team" className={ cls }>
				<h2>{ formatMessage( messages.team_headline ) }</h2>
			</div>

		)

	}

}

Team.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string

};

Team.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Team );
