import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import Form from '../utils/Form/Form';
import FormSubmit from '../utils/Form/FormSubmit';
import FormInput from '../utils/Form/FormInput';
import FormTextarea from '../utils/Form/FormTextarea';

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
	}
	

} );

class AnyQuestions extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const { formatMessage } = this.props.intl;

		return (

			<Form name="any-questions" >

				<FormInput label={ formatMessage( messages.email ) } name="email" value="info@maureentsakiris.com" />

				<FormTextarea label={ formatMessage( messages.tell_us_your_question ) } name="message" />

				<FormSubmit>{ formatMessage( messages.submit ) }</FormSubmit>

			</Form>

		)

	}

}

AnyQuestions.propTypes = {

	intl: intlShape.isRequired

};

export default injectIntl( AnyQuestions );
