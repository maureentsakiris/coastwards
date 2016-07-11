import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';

import Dialog from 'react-toolbox/lib/dialog';
import { Button } from 'react-toolbox/lib/button';

import style from './_styleDropForm';

const messages = defineMessages( {

	drop_form_upload_label:{
		id: "drop_form_upload_label",
		description: "0 - ",
		defaultMessage: "Upload"
	},
	drop_form_cancel_label:{
		id: "drop_form_cancel_label",
		description: "0 - ",
		defaultMessage: "Cancel"
	},
	drop_form_header:{
		id: "drop_form_header",
		description: "0 - ",
		defaultMessage: "Your image is ready for upload!"
	},
	drop_form_intro:{
		id: "drop_form_intro",
		description: "1 - ",
		defaultMessage: "(I'm currently working on this section ... but you can go ahead and press the upload button!)"
	}

} );

class DropForm extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const { formatMessage } = this.props.intl;
		const { intl, className, active, drop, onEscKeyDown, onCancelClick, onUploadClick, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		
		const cls = Classnames( className, style.dialog );

		return (

			<Dialog { ...restProps } className={ cls } active={ active } onEscKeyDown={ onEscKeyDown }>
				<div className={ style.content }>
					{ drop && <div className={ style.image } style={ { backgroundImage: 'url(' + drop.file.preview + ')' } } ></div> }
					<div className={ style.inner } >
						<h2>{ formatMessage( messages.drop_form_header ) }</h2>
						<p>{ formatMessage( messages.drop_form_intro ) }</p>
					</div>
				</div>
				<div className={ style.actions }>
					<Button className={ style.btn } label={ formatMessage( messages.drop_form_cancel_label ) } onClick={ onCancelClick }  /> 
					<Button className={ style.btn } label={ formatMessage( messages.drop_form_upload_label ) } onClick={ onUploadClick }  raised accent />
				</div>
			</Dialog>

		)

	}

}

DropForm.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string,
	active: PropTypes.bool,
	drop: PropTypes.object,
	onEscKeyDown: PropTypes.func,
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
