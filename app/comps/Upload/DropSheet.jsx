import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
/*import util from 'util';*/

import Sheet from '../../utils/Sheet/Sheet';

import style from './_styleDropSheet';

const messages = defineMessages( {

	sand:{
		id: "sand",
		description: "0 - ",
		defaultMessage: "Sand"
	},
	sand_description:{
		id: "sand_description",
		description: "0 - ",
		defaultMessage: "Sand can be many colors ranging from almost white to dark brown. If it runs through your fingers when dry .. it's sand."
	},
	pebbles:{
		id: "pebbles",
		description: "0 - ",
		defaultMessage: "Pebbles"
	},
	pebbles_description:{
		id: "pebbles_description",
		description: "0 - ",
		defaultMessage: "pebbles_description"
	},
	mud:{
		id: "mud",
		description: "0 - ",
		defaultMessage: "Mud"
	},
	mud_description:{
		id: "mud_description",
		description: "0 - ",
		defaultMessage: "mud_description"
	},
	rock:{
		id: "rock",
		description: "0 - ",
		defaultMessage: "Rock"
	},
	rock_description:{
		id: "rock_description",
		description: "0 - ",
		defaultMessage: "rock_description"
	},
	ice:{
		id: "ice",
		description: "0 - ",
		defaultMessage: "Ice"
	},
	ice_description:{
		id: "ice_description",
		description: "0 - ",
		defaultMessage: "ice_description"
	},
	man_made:{
		id: "man_made",
		description: "0 - ",
		defaultMessage: "Man-made"
	},
	man_made_description:{
		id: "man_made_description",
		description: "0 - ",
		defaultMessage: "man_made_description"
	},
	not_sure:{
		id: "not_sure",
		description: "0 - ",
		defaultMessage: "Not sure"
	},
	not_sure_description:{
		id: "not_sure_description",
		description: "0 - ",
		defaultMessage: "not_sure_description"
	},
	upload_drop_dialog_adaptation_label:{
		id: "upload_drop_dialog_adaptation_label",
		description: "0 - ",
		defaultMessage: "Can you see any of the following adaptation measures?"
	},
	dike:{
		id: "dike",
		description: "0 - ",
		defaultMessage: "Dike"
	},
	nourishment:{
		id: "nourishment",
		description: "0 - ",
		defaultMessage: "Nourishment"
	},
	fortification:{
		id: "fortification",
		description: "0 - ",
		defaultMessage: "Fortification"
	},
	verified_yes:{
		id: "verified_yes",
		description: "0 - ",
		defaultMessage: "Verified"
	},
	verified_no:{
		id: "verified_no",
		description: "0 - ",
		defaultMessage: "Not verified"
	}

} );

class FeatureSheet extends Component {


	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const { className, active, onEscKeyDown, onOverlayClick, drop, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		
		const cls = Classnames( className );

		const content = "upload content";

		return (

			<Sheet { ...restProps } className={ cls } active={ active } onEscKeyDown={ onEscKeyDown } onOverlayClick={ onOverlayClick } >
				{ content }
			</Sheet>

		)

	}

}

FeatureSheet.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string,
	active: PropTypes.bool.isRequired,
	onEscKeyDown: PropTypes.func,
	onOverlayClick: PropTypes.func,

	drop: PropTypes.object

};

FeatureSheet.defaultProps = {

	active: false

}

FeatureSheet.contextTypes = {

	showDialog: PropTypes.func,
	hideDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func,
	logError: PropTypes.func

};

export default injectIntl( FeatureSheet );
