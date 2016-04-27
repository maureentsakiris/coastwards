import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';

import style from './_styleSignUp';

import Form from '../../utils/FormTB/FormTB/FormTB';
import Input from '../../utils/FormTB/InputTB/InputTB';
import Submit from '../../utils/FormTB/SubmitTB/SubmitTB';


const messages = defineMessages( {

	phase_2:{
		id: "phase_2",
		description: "0 - Headline for Phase 2",
		defaultMessage: "Phase two"
	},
	phase_2_description:{
		id: "phase_2_description",
		description: "0 - ",
		defaultMessage: "We would like to do more and better. In phase two we plan to create a system of invitations to target coasts we have not covered in phase one. Sign up to show us (and those who can pay) your support and your willingness to participate."
	},
	form_label_email:{
		id: "form_label_email",
		description: "0 - ",
		defaultMessage: "Your email"
	},
	form_error_email:{
		id: "form_error_email",
		description: "1 - ",
		defaultMessage: "Please check your email"
	},
	form_submit_sign_up:{
		id: "form_submit_sign_up",
		description: "0 - ",
		defaultMessage: "Sign up for phase two"
	}
	


} );

class SignUp extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const { formatMessage } = this.props.intl;

		const cls = Classnames( style.signUp, style.pad, style.corset );

		const emailValidation = [
			{
				method: 'isEmail',
				options: { require_tld: true },
				error: formatMessage( messages.form_error_email )
			}
		]


		return (

			<div id="SignUp" className={ cls }>
				<h2>{ formatMessage( messages.phase_2 ) }</h2>
				<p>{ formatMessage( messages.phase_2_description ) }</p>
				<Form name="signup" noValidate>
					<Input 
						name="email" 
						label={ formatMessage( messages.form_label_email ) }
						validations={ emailValidation }
						required
						type="email"
					/>
					<Submit 
						name="submit" 
						label={ formatMessage( messages.form_submit_sign_up ) }
						accent
						raised
					/>
				</Form>
			</div>

		)

	}

}

SignUp.propTypes = {

	intl: intlShape.isRequired

};

SignUp.defaultProps = {

	

};

SignUp.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( SignUp );
