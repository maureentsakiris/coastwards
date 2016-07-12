import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Classnames from 'classnames';
import _ from 'underscore';

import Dialog from 'react-toolbox/lib/dialog';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

import Options from './Options';

import style from './_styleDropForm';

const messages = defineMessages( {

	drop_form_upload_label:{
		id: "drop_form_upload_label",
		description: "0 - Label of button to upload the dropped image",
		defaultMessage: "Upload"
	},
	drop_form_cancel_label:{
		id: "drop_form_cancel_label",
		description: "0 - Label of button to cancel upload of dropped image",
		defaultMessage: "Cancel"
	},
	drop_form_header:{
		id: "drop_form_header",
		description: "0 - Title of upload form for dropped image",
		defaultMessage: "Your image is ready for upload!"
	},
	drop_form_intro:{
		id: "drop_form_intro",
		description: "1 - Paragraph under title in upload form to ask users to answer a few more questions",
		defaultMessage: "Ok.. {quote} was a white lie. It would be extremely helpful if you also answered the following questions for us."
	},
	drop_form_intro_quote:{
		id: "drop_form_intro_quote",
		description: "0 - ",
		defaultMessage: "just drag & drop"
	},


	
	drop_form_material_label:{
		id: "drop_form_material_label",
		description: "1 - ",
		defaultMessage: "How would you describe the coast material?"
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


	drop_form_comment_label:{
		id: "drop_form_comment_label",
		description: "1 - ",
		defaultMessage: "Say hello, leave a note, tell us a story ..."
	},
	drop_form_comment_placeholder:{
		id: "drop_form_comment_placeholder",
		description: "1 - ",
		defaultMessage: "Hello world!"
	}

} );

class DropForm extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			material: '',
			comment: ''

		}

	}

	render () {

		const { formatMessage } = this.props.intl;
		const { intl, className, active, drop, onCancelClick, onUploadClick, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		const { comment } = this.state;

		const cls = Classnames( className, style.dialog );

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

			<Dialog { ...restProps } className={ cls } active={ active } onEscKeyDown={ this._onCancelClick }>
				<div className={ style.content }>
					{ drop && <div className={ style.image } style={ { backgroundImage: 'url(' + drop.file.preview + ')' } } ></div> }
					<div className={ style.inner } >
						<h2>{ formatMessage( messages.drop_form_header ) }</h2>
						<p>
							<FormattedMessage 
								{ ...messages.drop_form_intro }
								values={ { 

									quote: <i>"{ formatMessage( messages.drop_form_intro_quote ) }"</i>

								} }
							/> 
						</p>
						<div className={ style.form }>
							<h3>{ formatMessage( messages.drop_form_material_label ) } </h3>
							<Options 
								options={ materials } 
								onChange={ this._handleChange.bind( this, 'material' ) }
							/>
							<h3>{ formatMessage( messages.drop_form_comment_label ) }</h3>
							<Input 
								type="text" 
								floating={ false }
								hint={ formatMessage( messages.drop_form_comment_placeholder ) } 
								value={ comment } 
								multiline={ true } 
								onChange={ this._handleChange.bind( this, 'comment' ) }
							/>
						</div>
					</div>
				</div>
				<div className={ style.actions }>
					<Button className={ style.btn } label={ formatMessage( messages.drop_form_cancel_label ) } onClick={ this._onCancelClick }  /> 
					<Button className={ style.btn } label={ formatMessage( messages.drop_form_upload_label ) } onClick={ this._onUploadClick }  raised accent />
				</div>
			</Dialog>

		)

	}

	_handleChange = ( name, value ) => {

		// SKIPPING ANY KIND OF VALIDATION HERE ....
		_.extend( this.props.drop, { [ name ]: value } );
		this.setState( { [ name ]: value } );

	};

	_onUploadClick = ( ) => {

		this.props.onUploadClick();
		this._resetDropForm( );

	}

	_onCancelClick = ( ) => {

		this.props.onCancelClick();
		this._resetDropForm( );

	}

	_resetDropForm = ( ) => {

		this.setState( { material: '', comment: '' } );

	}

}

DropForm.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string,
	active: PropTypes.bool,
	drop: PropTypes.object,
	onCancelClick: PropTypes.func,
	onUploadClick: PropTypes.func

};

DropForm.defaultProps = {

	

};

DropForm.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( DropForm );
