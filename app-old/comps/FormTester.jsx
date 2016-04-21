import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import Form from './utils/Form/Form';
import FormSubmit from './utils/Form/FormSubmit';
import FormInput from './utils/Form/FormInput';
import FormTextarea from './utils/Form/FormTextarea';
import FormSelect from './utils/Form/FormSelect';
import FormRadio from './utils/Form/FormRadio';
import FormCheckbox from './utils/Form/FormCheckbox';


const messages = defineMessages( {

	submit:{
		id: 'submit',
		description: '0 - ',
		defaultMessage: 'Submit'
	},
	email:{
		id: 'email',
		description: '0 - ',
		defaultMessage: 'Email'
	},
	tell_us_your_question:{
		id: 'tell_us_your_question',
		description: '0 - ',
		defaultMessage: 'Tell us your question'
	},
	isEmailError:{
		id: 'isEmailError',
		description: ' - ',
		defaultMessage: 'Please check your email. Something is wrong.'
	}

	

} );

class FormTester extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const { formatMessage } = this.props.intl;

		const emailValidation = [
			{
				method: 'isEmail',
				options: { require_tld: true },
				errorMsg: formatMessage( messages.isEmailError )
			}
		]

		const textareaValidation = [
			{
				method: 'isLength',
				options: { min: 1 },
				errorMsg: "Didn't you want to leave a message??"
			}
		]

		const selectValidation = [
			{
				method: 'equals',
				options: '6',
				errorMsg: "Told you to select SIX!"
			}
		]

		const radioValidation = [
			{
				method: 'equals',
				options: '3',
				errorMsg: 'errr wrong answer!'
			}
		]

		const selectOptions = [

			{ optgroup: 'First group', options: [
				{ value: '1', label: 'one' },
				{ value: '3', label: 'three' },
				{ value: '2', label: 'two' }
			] },
			{ optgroup: 'Second group', options: [
				{ value: '4', label: 'four' },
				{ value: '5', label: 'five' },
				{ value: '6', label: 'six' }
			] }

		]

		const radioOptions = [

			{ value: '1', label: 'one' },
			{ value: '3', label: 'three' },
			{ value: '2', label: 'two' }

		]

		const checkboxValidation = [
			{
				method: 'equals',
				options: '1',
				errorMsg: "oh cmon, please agree"
			}
		]

		return (

			<Form name="any-questions" noValidate>

				<FormInput 
					type="email" 
					label={ formatMessage( messages.email ) } 
					name="email" 
					value="info@maureentsakiris.com" 
					validations={ emailValidation } 
					required 
				/> 
				<FormTextarea 
					value="somedefault value" 
					name="message" 
					label={ formatMessage( messages.tell_us_your_question ) } 
					validations={ textareaValidation }
					required
				/>
				<FormSelect 
					label="A dropdown list" 
					name="select" 
					options={ selectOptions } 
					sortBy="value" 
					prompt="Please select number 6 ... " 
					validations={ selectValidation }
					required
				/>
				<FormRadio 
					label="some radio options" 
					name="radio" 
					options={ radioOptions } 
					value="1" 
					sortBy="value" 
					validations={ radioValidation } 
					required
				/>
				<FormCheckbox 
					label="Please agree to our terms to continue" 
					name="check" 
					options={ { value: '1', label: 'Of course!' } } 
					validations={ checkboxValidation } 
					required 
				/>
				<FormSubmit>{ formatMessage( messages.submit ) }</FormSubmit>

			</Form>

		)

	}

}

FormTester.propTypes = {

	intl: intlShape.isRequired

};

export default injectIntl( FormTester );
