import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import _ from 'underscore';

import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import Options from './Options';

import style from './_styleUploadDropDialog';


const messages = defineMessages( {

	upload_drop_dialog_comment_label:{
		id: "upload_drop_dialog_comment_label",
		description: "1 - ",
		defaultMessage: "Say hello, leave a note, tell us a story ..."
	},
	upload_drop_dialog_comment_placeholder:{
		id: "upload_drop_dialog_comment_placeholder",
		description: "1 - ",
		defaultMessage: "Hello world!"
	},
	upload_drop_dialog_material_label:{
		id: "upload_drop_dialog_material_label",
		description: "1 - ",
		defaultMessage: "How would you describe the coast material?"
	},
	upload_drop_dialog_upload_label:{
		id: "upload_feature_dialog_upload_label",
		description: "0 - ",
		defaultMessage: "Upload"
	},
	upload_drop_dialog_cancel_label:{
		id: "upload_drop_dialog_cancel_label",
		description: "0 - ",
		defaultMessage: "Cancel"
	},
	upload_drop_dialog_intro:{
		id: "upload_drop_dialog_intro",
		description: "1 - ",
		defaultMessage: "Help us even more by answering a few questions, or scroll down to click the upload button."
	},
	upload_drop_dialog_header:{
		id: "upload_drop_dialog_header",
		description: "0 - ",
		defaultMessage: "Your image is ready for upload!"
	},
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
	uploading_image:{
		id: "uploading_image",
		description: "0 - ",
		defaultMessage: "Uploading image"
	},
	updating_database:{
		id: "updating_database",
		description: "0 - ",
		defaultMessage: "Updating database"
	}
	

} );

class UploadDropDialog extends Component {


	componentWillUpdate ( p ){

		if( p.active != this.props.active ){

			this._resetDialog();

		}

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			comment: '',
			material: '',
			hideMore: false

		}

	}

	render () {

		const { formatMessage/*, locale*/ } = this.props.intl;

		const { className, dialogDrop, onUploadClick, onCancelClick, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		const { submitting, comment, hideMore } = this.state;

		const cls = Classnames( className, style.dialog );
		const clsMore = Classnames( style.more, {

			[ style.hideMore ]: hideMore

		} );

		const materials = [

			{ value: 'sand', label: formatMessage( messages.sand ), description: formatMessage( messages.sand_description ) },
			{ value: 'pebbles', label: formatMessage( messages.pebbles ), description: formatMessage( messages.pebbles_description ) },
			{ value: 'rock', label: formatMessage( messages.rock ), description: formatMessage( messages.rock_description )  },
			{ value: 'mud', label: formatMessage( messages.mud ), description: formatMessage( messages.mud_description ) },
			{ value: 'ice', label: formatMessage( messages.ice ), description: formatMessage( messages.ice_description ) },
			{ value: 'man_made', label: formatMessage( messages.man_made ), description: formatMessage( messages.man_made_description ) },
			{ value: 'not_sure', label: formatMessage( messages.not_sure ), "description": formatMessage( messages.not_sure_description )  }

		];

		return (

			<Dialog { ...restProps } className={ cls } actions={ [] } onEscKeyDown={ this._onCancelClick } onOverlayClick={ () => {} } >
				<div ref="content" className={ style.content } onScroll={ this._handleScroll }>
					{ dialogDrop && <img src={ dialogDrop.file.preview } className={ style.image } /> }
					<div className={ style.inner } >
						<h3>{ formatMessage( messages.upload_drop_dialog_header ) }</h3>
						<p>{ formatMessage( messages.upload_drop_dialog_intro ) }</p>
						<div className={ style.form }>
							<h5 ref="material">{ formatMessage( messages.upload_drop_dialog_material_label ) } </h5>
							<Options 
								options={ materials } 
								onChange={ this._handleChange.bind( this, 'material' ) }
								disabled={ submitting }
							/>
							<h5 ref="comment">{ formatMessage( messages.upload_drop_dialog_comment_label ) }</h5>
							<Input 
								type="text" 
								floating={ false }
								hint={ formatMessage( messages.upload_drop_dialog_comment_placeholder ) } 
								value={ comment } 
								multiline={ true } 
								onChange={ this._handleChange.bind( this, 'comment' ) }
								disabled={ submitting }
							/>
						</div>
					</div>
					<div className={ style.actions } >
						<Button className={ style.btn } label={ formatMessage( messages.upload_drop_dialog_cancel_label ) } onClick={ this._onCancelClick }  /> 
						<Button className={ style.btn } label={ formatMessage( messages.upload_drop_dialog_upload_label ) } onClick={ this._onUploadClick }  raised accent disabled={ submitting } />
					</div>
					<div className={ clsMore } >
						<Button className={ style.icon } icon="expand_more" floating mini onClick={ this._scrollMore } />
					</div>
				</div>
			</Dialog>

		)

	}


	_handleScroll = ( e ) => {

		let content = e.target;

		let hideMore = content.scrollTop + 60 >= ( content.scrollHeight - content.offsetHeight ) ? true : false;
		this.setState( { hideMore: hideMore } );

	}

	_scrollMore = ( ) => {

		let content = this.refs.content;
		let step = content.offsetHeight / 2;
		let scrollTop = content.scrollTop + step >= content.scrollHeight ? content.scrollHeight : content.scrollTop + step;

		this.refs.content.scrollTop += scrollTop;

	}

	_onCancelClick = () => {

		this._resetDialog();
		this.props.onCancelClick();

	}

	_onUploadClick = () => {

		this.props.onUploadClick();

	}

	_resetDialog = () => {

		this.setState( {

			comment: '',
			material: '',
			hideMore: false

		} );

	}

	_handleChange = ( name, value ) => {

		// SKIPPING ANY KIND OF VALIDATION HERE ....
		_.extend( this.props.dialogDrop, { [ name ]: value } );
		this.setState( { [ name ]: value } );

	};

}

UploadDropDialog.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string,
	active: PropTypes.bool,
	dialogDrop: PropTypes.object,
	onUploadClick: PropTypes.func.isRequired,
	onCancelClick: PropTypes.func.isRequired,
	reset: PropTypes.bool

};

UploadDropDialog.defaultProps = {

	active: false,
	type: 'normal',
	progress: 0

};

UploadDropDialog.contextTypes = {

	showDialog: PropTypes.func,
	hideDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func,
	logError: PropTypes.func

};

export default injectIntl( UploadDropDialog );
