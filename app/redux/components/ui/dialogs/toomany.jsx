import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import { promiseXHR } from 'actions/util/request/xhr'

import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'
import BR from 'components/tags/br'

import FORM from 'components/tags/form'

import EMAIL from 'components/form/input/email'
import COMMENT from 'components/form/input/comment'
import SUBMIT from  'components/form/button/submit'

import style from './_toomany'


const messages = defineMessages( {

	toomany_header:{
		id: "toomany_header",
		description: "Header",
		defaultMessage: "Cool, tell us more!"
	},
	toomany_text:{
		id: "toomany_text",
		description: "P - ",
		defaultMessage: "Let us know how many pictures you have and we will get back to you with an alternative to uploading them one by one."
	},
	one_thing_though:{
		id: "one_thing_though",
		description: " - ",
		defaultMessage: "KEEP IN MIND THOUGH, your images must have the location embedded in the metadata, otherwise we cannot place them on the map."
	},

	label_email:{
		id: "label_email",
		description: "Lable - Email",
		defaultMessage: "Your email"
	},
	placeholder_email: {
		id: "placeholder_email",
		description: "Placeholder - Email",
		defaultMessage: "Your email"
	},
	label_question:{
		id: "label_question",
		description: "Label",
		defaultMessage: "How many pictures do you have? From where?"
	},
	placeholder_question:{
		id: "placeholder_question",
		description: "Placeholder",
		defaultMessage: "How many pictures do you have? From where?"
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
		defaultMessage: "Email sent, thanks for contacting us!"
	},
	mail_ko:{
		id: "mail_ko",
		description: "Status - ",
		defaultMessage: "Sorry, there was a problem sending the email. Please try again"
	}
	
	

} )


class toomany extends Component {


	static propTypes = {

		intl: intlShape,
		component: PropTypes.node,
		active: PropTypes.bool,
		closeDialog: PropTypes.func

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
		const { sending, status, validated } = this.state

		const disabled = sending || !validated

		return(

			<DIV>
				<H priority={ 2 }>{ formatMessage( messages.toomany_header ) }</H>
				<P>{ formatMessage( messages.toomany_text ) }</P>
				<BR/>
				<FORM action="#" id="RequestBatch" >
					<EMAIL onChange={ this._validateForm } form="RequestBatch" label={ formatMessage( messages.label_email ) } name="email" placeholder={ formatMessage( messages.placeholder_email ) } />
					<BR />
					<COMMENT onChange={ this._validateForm } form="RequestBatch" label={ formatMessage( messages.label_question ) } name="comment" placeholder={ formatMessage( messages.placeholder_question ) } />
					<BR />
					<SUBMIT onClick={ this._submit } form="RequestBatch" name="submit" label={ formatMessage( messages.label_submit ) } disabled={ disabled } />
					<DIV className={ style.status } >{ status && formatMessage( messages[ status ] ) }</DIV>
				</FORM>
			</DIV>

		)

	}

	_validateForm = ( ) => {

		let validEmail = isEmail( document.querySelector( '#RequestBatch input[name=email]' ).value )
		let validComment = !isEmpty( document.querySelector( '#RequestBatch textarea[name=comment]' ).value )

		let valid = validEmail && validComment

		this.setState( { validated: valid, status: '' } )

	}

	_submit = ( e ) => {

		e.preventDefault()

		let formData = new FormData( document.getElementById( 'RequestBatch' ) )

		let options = { 

			url: '/contact/requestBatchUpload',
			data: formData

		}

		this.setState( { sending: true, status: 'sending_mail' } )

		promiseXHR( options )
		.then( ( response ) => {

			document.getElementById( 'RequestBatch' ).reset()

			if( response == 'OK' ){

				this.setState( { status: 'mail_ok', sending: false } )

			}else{

				this.setState( { status: 'mail_ko', sending: false } )

			}

			return response

		} )
		.catch( ( error ) => {

			console.log( error );

		} )

	}

}

export default injectIntl ( toomany )
