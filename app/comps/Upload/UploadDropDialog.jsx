import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import Dialog from 'react-toolbox/lib/dialog';

import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import style from './_styleDialog';

const messages = defineMessages( {

	upload_drop_dialog_comment_label:{
		id: "upload_drop_dialog_comment_label",
		description: " - ",
		defaultMessage: "Tell us a little more about your coast ..."
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
	}

} );

class UploadDropDialog extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			comment: ''

		}

	}

	render () {

		const { formatMessage/*, locale*/ } = this.props.intl;

		const { className, dropImage, onUploadClick, onCancelClick, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		const { comment } = this.state;

		const cls = Classnames( className, style.dialog );

		const actions = [

			/*{ label: cancelLabel, onClick: onCancelClick },
			{ label: uploadLabel, onClick: onUploadClick }*/

		];

		return (

			<Dialog { ...restProps } className={ cls } actions={ actions } onEscKeyDown={ this._onCancelClick } onOverlayClick={ () => {} } >
				{ dropImage && <img src={ dropImage } className={ style.image } /> }
				<div className={ style.inner } >
					<Input 
						type="text" 
						label={ formatMessage( messages.upload_drop_dialog_comment_label ) } 
						value={ comment } 
						multiline={ true } 
						onChange={ this._handleChange.bind( this, 'comment' ) } 
					/>
					<div className={ style.btns } >
						<Button className={ style.btn } label={ formatMessage( messages.upload_drop_dialog_upload_label ) } onClick={ this._onUploadClick }  raised accent />
						<Button className={ style.btn } label={ formatMessage( messages.upload_drop_dialog_cancel_label ) } onClick={ this._onCancelClick }  />
					</div>
				</div>
			</Dialog>

		)

	}

	_onCancelClick = () => {

		this._resetDialog();
		this.props.onCancelClick();

	}

	_onUploadClick = () => {

		this._resetDialog();
		this.props.onUploadClick( this.state.comment );

	}

	_resetDialog = () => {

		this.setState( {

			comment: ''

		} );

	}

	_handleChange = ( name, value ) => {
    
		this.setState( { ...this.state, [ name ]: value } );

	};

}

UploadDropDialog.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string,
	active: PropTypes.bool,
	dropImage: PropTypes.string,
	onUploadClick: PropTypes.func.isRequired,
	onCancelClick: PropTypes.func.isRequired

};

UploadDropDialog.defaultProps = {

	active: false,
	type: 'normal'

};

UploadDropDialog.contextTypes = {

	showDialog: PropTypes.func,
	hideDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func,
	logError: PropTypes.func

};

export default injectIntl( UploadDropDialog );
