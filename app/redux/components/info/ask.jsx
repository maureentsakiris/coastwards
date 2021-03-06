import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import { promiseXHR } from 'actions/util/request/xhr'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'

import FORM from 'components/tags/form'
import EMAIL from 'components/form/input/email'
import COMMENT from 'components/form/input/comment'
import SUBMIT from  'components/form/button/submit'

import H from 'components/tags/h'
import DIV from 'components/tags/div'

import style from './_ask'

const messages = defineMessages( {

	one_more_question:{
		id: "one_more_question",
		description: "Section header - Contact us",
		defaultMessage: "Still have a question!"
	}, 
	one_more_question_title:{
		id: "one_more_question_title",
		description: "Section header title - Tell us your question (in english please)",
		defaultMessage: "Ask us (in english please)"
	},
	label_email:{
		id: "label_email",
		description: "Lable - Email",
		defaultMessage: "Your email"
	},
	placeholder_email: {
		id: "placeholder_email",
		description: "Placeholder - Email",
		defaultMessage: "And your email"
	},
	label_question:{
		id: "label_question",
		description: "Label - Your Question",
		defaultMessage: "Tell us your question"
	},
	placeholder_question:{
		id: "placeholder_question",
		description: "Placeholder - Tell us your question",
		defaultMessage: "Tell us your question"
	},
	label_submit:{
		id: "label_submit",
		description: "Label - Submit",
		defaultMessage: "Submit"
	},

	//mail status
	sending_mail:{ 
		id: "sending_mail",
		description: "Status - ",
		defaultMessage: "Just a sec ... sending mail"
	},
	mail_ok:{
		id: "mail_ok",
		description: "Status - ",
		defaultMessage: "Email sent, thanks for asking!"
	},
	mail_ko:{
		id: "mail_ko",
		description: "Status - ",
		defaultMessage: "Sorry, there was a problem sending the email. Please try again"
	}

} )

class ask extends Component {

	static propTypes = {

		intl: intlShape.isRequired, 
		jazzSupported: PropTypes.bool

	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

		this.state = {

			sending: false,
			status: '',
			validated: false

		}

	}

	render () {

		const { formatMessage } = this.props.intl
		const { jazzSupported } = this.props
		const { sending, status, validated } = this.state

		const disabled = sending || !validated

		const mess = typeof status === 'object' ? status.message : status //if error object
		const m = messages[ mess ] ? formatMessage( messages[ mess ] ) : mess //if translation 


		if( !jazzSupported ){

			return(

				<DIV id="Contact" className={ style.noJazz } >
					<H priority={ 3 } >{ formatMessage( messages.one_more_question ) }</H>
					<FORM action="javascript:;" id="Ask" >
						<COMMENT id="Comment" onChange={ this._validateForm } form="Ask" name="comment" label={ formatMessage( messages.label_question ) } placeholder={ formatMessage( messages.placeholder_question ) } />
						<EMAIL id="Email" onChange={ this._validateForm } form="Ask" name="email" label={ formatMessage( messages.label_email ) } placeholder={ formatMessage( messages.placeholder_email ) } />
						<SUBMIT onClick={ this._submit } form="Ask" name="submit" label={ formatMessage( messages.label_submit ) } disabled={ disabled } />
						<DIV className={ style.status } >{ status && m }</DIV>
					</FORM>
				</DIV>

			)


		}else{

			return(

				<DIV id="Contact" className={ style.jazz } >
					<H priority={ 3 } >{ formatMessage( messages.one_more_question ) }</H>
					<FORM action="javascript:;" id="Ask" >
						<COMMENT id="Comment" onChange={ this._validateForm } form="Ask" name="comment" label={ formatMessage( messages.label_question ) } placeholder={ formatMessage( messages.placeholder_question ) } />
						<EMAIL id="Email" onChange={ this._validateForm } form="Ask" name="email" label={ formatMessage( messages.label_email ) } placeholder={ formatMessage( messages.placeholder_email ) } />
						<SUBMIT onClick={ this._submit } form="Ask" name="submit" label={ formatMessage( messages.label_submit ) } disabled={ disabled } />
						<DIV className={ style.status } >{ status && m }</DIV>
					</FORM>
				</DIV>

			)

		}

	}

	_validateForm = ( ) => {

		let validEmail = isEmail( document.querySelector( '#Ask input[name=email]' ).value )
		let validComment = !isEmpty( document.querySelector( '#Ask textarea[name=comment]' ).value )

		let valid = validEmail && validComment

		this.setState( { validated: valid, status: '' } )

	}

	_submit = ( e ) => {

		e.preventDefault()

		let formData = new FormData( document.getElementById( 'Ask' ) )

		/*for ( var pair of formData.entries() ) {

			console.log( pair[ 0 ]+ ', ' + pair[ 1 ] )

		}*/

		let options = { 

			url: '/contact/ask',
			data: formData

		}

		this.setState( { sending: true, status: 'sending_mail' } )

		promiseXHR( options )
			.then( ( response ) => {

				document.getElementById( 'Ask' ).reset()

				if( response == 'OK' ){

					this.setState( { status: 'mail_ok', sending: false } )

				}else{

					this.setState( { status: 'mail_ko', sending: false } )

				}

				return response

			} )
			.catch( ( error ) => {

				this.setState( { status: error, sending: false } )

			} )

	}

}

export default injectIntl( ask )