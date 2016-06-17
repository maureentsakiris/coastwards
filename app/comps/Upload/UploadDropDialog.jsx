import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import _ from 'underscore';

import Dialog from 'react-toolbox/lib/dialog';
import Dropdown from 'react-toolbox/lib/dropdown';
/*import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';*/
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
		defaultMessage: "Tell us a little more about this coast ..."
	},
	upload_drop_dialog_category:{
		id: "upload_drop_dialog_category",
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
		defaultMessage: "Help us categorize this coast by answering a few questions. Also, leave us (and the rest of the world) a note. Tell us the story of this coast, or just say hello ..."
	},
	upload_drop_dialog_extent:{
		id: "upload_drop_dialog_extent",
		description: "1 - ",
		defaultMessage: "How long would it take you to go from one end to the other?"
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
			category: '',
			extent: ''

		}

	}

	render () {

		const { formatMessage/*, locale*/ } = this.props.intl;

		const { className, dialogDrop, onUploadClick, onCancelClick, progress, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		const { comment, category, extent } = this.state;

		const cls = Classnames( className, style.dialog );

		const categories = [

			{ value: 'sand', label: 'Sand', description: "Sand can be many colors, ranging from almost white to dark brown. If it runs through your fingers when it's dry, it's sand." },
			{ value: 'pebble', label: 'Pebble', description: "Pebbles don't run through your fingers but are not bigger than a fist." },
			{ value: 'rock', label: 'Rock', description: "This can be solid rock as seen at cliffs or a collection of rocky stones (bigger than a fist)"  },
			{ value: 'mud', label: 'Mud', description: "Muddy coasts are constantly wet because they usually have a delta nearby."  },
			{ value: 'ice', label: 'Ice', description: "Coast material is not visible because it is covered in ice"  },
			{ value: 'notsure', label: 'Not sure', "description": "No worries! If you like you can describe the coast material in your own words in the text field below"  }

		];

		const extents = [

			{ value: '15', label: 'About 15 minutes' },
			{ value: '30', label: 'About 30 minutes' },
			{ value: '60', label: 'About an hour' },
			{ value: '120', label: 'About two hours' },
			{ value: 'notsure', label: 'No idea' }

		]

		/*<RadioGroup name="category" value={ category } onChange={ this._handleChange.bind( this, 'category' ) } >
							<RadioButton label="Sandy" value="sandy"/>
							<RadioButton label="Pebbles" value="pebbles"/>
							<RadioButton label="Rocky" value="rocky"/>
							<RadioButton label="Muddy" value="muddy"/>
							<RadioButton label="Ice" value="ice"/>
						</RadioGroup>*/

		/*<Dropdown
							label={ formatMessage( messages.upload_drop_dialog_extent ) }
							onChange={ this._handleChange.bind( this, 'extent' ) }
							value={ extent }
							source={ extents }
							template={ this._template }
						/>*/

		const submitting = progress > 0;

		console.log( progress );

		return (

			<Dialog { ...restProps } className={ cls } actions={ [] } onEscKeyDown={ this._onCancelClick } onOverlayClick={ () => {} } >
				{ dialogDrop && <img src={ dialogDrop.file.preview } className={ style.image } /> }
				<div className={ style.inner } >
					<h3>Your image is ready for upload</h3>
					<p>{ formatMessage( messages.upload_drop_dialog_intro ) }</p>
					<div className={ style.form }>
						<Dropdown
							label={ formatMessage( messages.upload_drop_dialog_category ) }
							onChange={ this._handleChange.bind( this, 'category' ) }
							value={ category }
							source={ categories }
							template={ this._template }
						/>
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

	_template = ( item ) => {

		const p = {

			margin: '0px',
			fontSize: '1.4rem',
			lineHeight: '1.4'

		}

		return (
			<div>
				<h4>{ item.label }</h4>
				<p style={ p }>{ item.description }</p>
			</div>
    
		);

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
			category: '',
			extent: ''

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
