import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import Dialog from 'react-toolbox/lib/dialog';
import util from 'util';

import style from './_styleFeatureDialog';

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

class FeatureDialog extends Component {

	static propTypes = {

		className: PropTypes.string,
		active: PropTypes.bool,
		feature: PropTypes.object,
		label: PropTypes.string,
		onClick: PropTypes.func.isRequired

	};

	static defaultProps = {

		active: false,
		type: 'normal'

	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			hideMore: false

		}

	}

	render () {

		const { className, feature, label, onClick, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		
		const cls = Classnames( className, style.dialog );


		const actions = [

			{ label: label, onClick: onClick }

		];

		const content = this._renderFeature( feature );

		return (

			<Dialog { ...restProps } className={ cls } actions={ actions } onEscKeyDown={ onClick } onOverlayClick={ onClick } >
				{ content }
			</Dialog>

		)

	}

	_renderFeature = ( feature ) => {

		if( !feature ){

			return '';

		}

		const { formatMessage, formatDate } = this.props.intl;
		const props = feature.properties;
		const material = props.material ? formatMessage( messages[ props.material ] ) : '';
		const point = util.format( '%s, %s', feature.geometry.coordinates[ 1 ], feature.geometry.coordinates[ 0 ] );
		const date = formatDate( props.datetime, {

			year: 'numeric',
			month: 'numeric',
			day: 'numeric'

		} );
		const verified = props.verified == '1' ? formatMessage( messages.verified_yes ) : formatMessage( messages.verified_no );

		const clsIcon = Classnames( 'material-icons', style.icon );


		return (

			<div ref="content" className={ style.content } onScroll={ this._handleScroll }>
				<img src={ props.image } className={ style.image } />
				<div id="Inner" className={ style.inner }>
					{ props.comment && <p className={ style.comment }>{ props.comment }</p> }
					<div id="Grid" className={ style.grid }>
						{ props.material && <p className={ style.g0 }><i className={ clsIcon }>texture</i>{ material }</p> }
						{ point && <p className={ style.g0 }><i className={ clsIcon }>place</i>{ point }</p> }
						{ props.datetime && <p className={ style.g0 }><i className={ clsIcon }>date_range</i>{ date }</p> }
						{ props.verified && <p className={ style.g0 }><i className={ clsIcon }>verified_user</i>{ verified }</p>}
					</div>
				</div>
			</div>

		)

	}

}

FeatureDialog.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string,
	active: PropTypes.bool,
	feature: PropTypes.object,
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired

};

FeatureDialog.defaultProps = {

	active: false,
	type: 'normal'

}

FeatureDialog.contextTypes = {

	showDialog: PropTypes.func,
	hideDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func,
	logError: PropTypes.func

};

export default injectIntl( FeatureDialog );
