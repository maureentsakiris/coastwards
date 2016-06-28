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
		defaultMessage: "Write a comment ..."
	},
	upload_drop_dialog_category_label:{
		id: "upload_drop_dialog_category_label",
		description: "1 - ",
		defaultMessage: "Describe the coast material"
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

			submitting: false,
			comment: '',
			category: ''

		}

	}

	render () {

		const { formatMessage/*, locale*/ } = this.props.intl;

		const { className, dialogDrop, onUploadClick, onCancelClick, progress, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		const { submitting, comment, category } = this.state;

		const cls = Classnames( className, style.dialog );

		/*const categories = [

			{ value: 'sand', label: 'Sand', description: "Sand can be many colors, ranging from almost white to dark brown. If it runs through your fingers when it's dry, it's sand." },
			{ value: 'pebble', label: 'Pebble', description: "Pebbles don't run through your fingers but are not bigger than a fist." },
			{ value: 'rock', label: 'Rock', description: "This can be solid rock as seen at cliffs or a collection of rocky stones (bigger than a fist)"  },
			{ value: 'mud', label: 'Mud', description: "Muddy coasts are constantly wet because they usually have a delta nearby."  },
			{ value: 'ice', label: 'Ice', description: "Coast material is not visible because it is covered in ice"  },
			{ value: 'notsure', label: 'Not sure', "description": "No worries! If you like you can describe the coast material in your own words in the text field below"  }

		];
		<Dropdown
			label={ formatMessage( messages.upload_drop_dialog_category ) }
			onChange={ this._handleChange.bind( this, 'category' ) }
			value={ category }
			source={ categories }
			template={ this._template }
			disabled={ submitting }
		/>*/

		return (

			<Dialog { ...restProps } className={ cls } actions={ [] } onEscKeyDown={ this._onCancelClick } onOverlayClick={ () => {} } >
				<div className={ style.content }>
					{ dialogDrop && <img src={ dialogDrop.file.preview } className={ style.image } /> }
					<div className={ style.inner } >
						<h3>{ formatMessage( messages.upload_drop_dialog_header ) }</h3>
						<p>{ formatMessage( messages.upload_drop_dialog_intro ) }</p>
						<div className={ style.form }>
							<h4>{ formatMessage( messages.upload_drop_dialog_category_label ) }</h4>
							<RadioGroup name="category" value={ category } onChange={ this._handleChange.bind( this, 'category' ) }>
								<RadioButton label="Sand" value="sand"/>
								<RadioButton label="Mud" value="mud"/> 
								<RadioButton label="Pebbles" value="pebbles"/>		        
								<RadioButton label="Rock" value="rock"/> 
								<RadioButton label="Ice" value="ice"/>
								<RadioButton label="Man-made" value="manmade"/>
								<RadioButton label="Not sure ..." value="unsure"/>      
							</RadioGroup>
							<Input 
								type="text" 
								label={ formatMessage( messages.upload_drop_dialog_comment_label ) } 
								value={ comment } 
								multiline={ true } 
								onChange={ this._handleChange.bind( this, 'comment' ) }
								disabled={ submitting }
							/>
						</div>
					</div>
				</div>
				<div className={ style.actions } >
					{ !submitting && <Button className={ style.btn } label={ formatMessage( messages.upload_drop_dialog_cancel_label ) } onClick={ this._onCancelClick }  /> }
					{ !submitting && <Button className={ style.btn } label={ formatMessage( messages.upload_drop_dialog_upload_label ) } onClick={ this._onUploadClick }  raised accent disabled={ submitting } /> }
					{ submitting && <ProgressBar type="linear" mode="determinate" value={ progress } /> }
				</div>
			</Dialog>

		)

	}

	_template = ( item ) => {

		const div = {

			paddingRight: '30px'

		}

		const h4 = {

			fontSize: '1.92rem',
			color: '#212121',
			fontWeight: '500'

		}

		const p = {

			margin: '0px',
			fontSize: '1.4rem',
			lineHeight: '1.4',
			color: '#757575'

		}

		return (
			<div style={ div }>
				<h4 style={ h4 }>{ item.label }</h4>
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
		this.setState( { submitting: true } );

	}

	_resetDialog = () => {

		this.setState( {

			submitting: false,
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
	progress: PropTypes.number,
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
