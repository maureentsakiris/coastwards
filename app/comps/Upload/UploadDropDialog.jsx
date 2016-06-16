import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import _ from 'underscore';

import Dialog from 'react-toolbox/lib/dialog';
/*import Dropdown from 'react-toolbox/lib/dropdown';*/
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import style from './_styleDialog';

/*import sand from '../../../public/assets/sand.jpg'; 
import pebbles from '../../../public/assets/pebbles.jpg';*/

const messages = defineMessages( {

	upload_drop_dialog_comment_label:{
		id: "upload_drop_dialog_comment_label",
		description: "1 - ",
		defaultMessage: "Tell us a little more about your coast ..."
	},
	upload_drop_dialog_category:{
		id: "upload_drop_dialog_category",
		description: "1 - ",
		defaultMessage: "Help us categorize this coast"
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
		defaultMessage: "Almost there! If you like, you can help us determine its category and leave a comment for others to read. When you are ready, scroll down and hit the upload button."
	}/*,
	upload_drop_dialog_dropdown_prompt:{
		id: "upload_drop_dialog_dropdown_prompt",
		description: " - ",
		defaultMessage: "Please select ..."
	}*/

} );

class UploadDropDialog extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			comment: '',
			category: 'empty'

		}

	}

	render () {

		const { formatMessage/*, locale*/ } = this.props.intl;

		const { className, dialogDrop, onUploadClick, onCancelClick, progress, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		const { comment, category } = this.state;

		const cls = Classnames( className, style.dialog );

		const actions = [

			/*{ label: cancelLabel, onClick: onCancelClick },
			{ label: uploadLabel, onClick: onUploadClick }*/

		];

		/*const categories = [

			{ value: 'sandy', label: 'Sandy', description: "Does the coast material run through your fingers when it's dry?" },
			{ value: 'pebbles', label: 'Pebbles', description: "Is the coast material small stones not bigger than your fist?" },
			{ value: 'rocky', label: 'Rocky', description: "Is the coast material solid rock or rocks so big not even Hercules could move them?"  },
			{ value: 'muddy', label: 'Muddy', description: "Is the coast material constantly wet, usually because there is a delta nearby?"  },
			{ value: 'fortified', label: 'Fortified', description: "Is the original coast material by human made walls of rock?"  },
			{ value: 'noneofabove', label: 'None of the above', "img": "Choose this option if you are unsure but would like to describe the coast in the text field below."  }

		];

		<Dropdown
			label={ formatMessage( messages.upload_drop_dialog_category ) }
			onChange={ this._handleChange.bind( this, 'category' ) }
			value={ category }
			source={ categories }
		
		/>	*/

		const submitting = progress > 0;


		return (

			<Dialog { ...restProps } className={ cls } actions={ actions } onEscKeyDown={ this._onCancelClick } onOverlayClick={ () => {} } >
				{ dialogDrop && <img src={ dialogDrop.file.preview } className={ style.image } /> }
				<div className={ style.inner } >
					<h3>Your image is ready for upload</h3>
					<p>{ formatMessage( messages.upload_drop_dialog_intro ) }</p>
					<div>
						<RadioGroup name="category" value={ category } onChange={ this._handleChange.bind( this, 'category' ) } >
							<RadioButton label="Sandy" value="sandy"/>
							<RadioButton label="Pebbles" value="pebbles"/>
							<RadioButton label="Rocky" value="rocky"/>
							<RadioButton label="Muddy" value="muddy"/>
							<RadioButton label="Ice" value="ice"/>
						</RadioGroup>
						<Input 
							type="text" 
							label={ formatMessage( messages.upload_drop_dialog_comment_label ) } 
							value={ comment } 
							multiline={ true } 
							onChange={ this._handleChange.bind( this, 'comment' ) } 
						/>
					</div>
					{ submitting && <ProgressBar type="linear" mode="determinate" value={ progress } /> }
					<div className={ style.btns } >
						{ !submitting && <Button className={ style.btn } label={ formatMessage( messages.upload_drop_dialog_upload_label ) } onClick={ this._onUploadClick }  raised accent /> }
						{ !submitting && <Button className={ style.btn } label={ formatMessage( messages.upload_drop_dialog_cancel_label ) } onClick={ this._onCancelClick }  /> }
					</div>
				</div>
			</Dialog>

		)

	}

	/*_dropdownTemplate = ( item ) => {

		return (
			<div>
				<h6>{ item.label }</h6>
				<p>{ item.description }</p>
			</div>
    
		);

	}*/

	_onCancelClick = () => {

		this._resetDialog();
		this.props.onCancelClick();

	}

	_onUploadClick = () => {

		this.props.onUploadClick( this.state.comment, this.state.category );

	}

	_resetDialog = () => {

		this.setState( {

			comment: '',
			category: ''

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
	progress: PropTypes.number

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
