import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import { promiseXHR } from 'actions/util/request/xhr'


import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'

import H from 'components/tags/h'
import P from 'components/tags/p'
import FORM from 'components/tags/form'

import INPUT from 'components/tags/input'
import EMAIL from 'components/form/input/email'
import COMMENT from 'components/form/input/comment'
import SUBMIT from  'components/form/button/submit'


import BR from 'components/tags/br'
import DIV from 'components/tags/div'

import style from './_report'

const messages = defineMessages( {

	report_header:{
		id: "report_header",
		description: "Header",
		defaultMessage: "Report this image"
	}, 
	report_text:{
		id: "report_text",
		description: "P",
		defaultMessage: "Here you have the possibility to report an image you think should not be published on the website."
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
	label_report_comment:{
		id: "label_report_comment",
		description: "Label - Your comment",
		defaultMessage: "Your comment"
	},
	placeholder_report_comment:{
		id: "placeholder_report_comment",
		description: "Placeholder - Tell us why you are reporting this image...",
		defaultMessage: "Tell us why you are reporting this image..."
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

class report extends Component {

	static propTypes = {

		intl: intlShape.isRequired,
		feature: PropTypes.object

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
		const { feature } = this.props
		const { sending, status, validated } = this.state

		const disabled = sending || !validated

		const mess = typeof status === 'object' ? status.message : status //if error object
		const m = messages[ mess ] ? formatMessage( messages[ mess ] ) : mess //if translation 

		//console.log( "FEATURE TO REPORT: ", feature )

		return(

			<DIV>
				<H priority={ 2 }>{ formatMessage( messages.report_header ) }</H>
				<P>{ formatMessage( messages.report_text ) }</P>
				<BR /><BR />
				<FORM action="#" id="Report" >
					<COMMENT id="Comment" onChange={ this._validateForm } form="Report" label={ formatMessage( messages.label_report_comment ) } name="comment" placeholder={ formatMessage( messages.placeholder_report_comment ) } />
					<BR />
					<INPUT type="hidden" id="Id" form="Report" name="id" value={ feature.properties.id } readOnly={ true } />
					<BR />
					<EMAIL id="Email" onChange={ this._validateForm } form="Report" label={ formatMessage( messages.label_email ) } name="email" placeholder={ formatMessage( messages.placeholder_email ) } />
					<BR />
					<SUBMIT onClick={ this._submit } form="Report" name="submit" label={ formatMessage( messages.label_submit ) } disabled={ disabled } />
					<DIV className={ style.status } >{ status && m }</DIV>
				</FORM>
			</DIV>

		)

	}

	_validateForm = ( ) => {

		let validEmail = isEmail( document.querySelector( '#Report input[name=email]' ).value )
		let validComment = !isEmpty( document.querySelector( '#Report textarea[name=comment]' ).value )

		let valid = validEmail && validComment

		this.setState( { validated: valid, status: '' } )

	}

	_submit = ( e ) => {

		e.preventDefault()

		let formData = new FormData( document.getElementById( 'Report' ) )

		let options = { 

			url: '/contact/report',
			data: formData

		}

		this.setState( { sending: true, status: 'sending_mail' } )

		promiseXHR( options )
		.then( ( response ) => {

			document.getElementById( 'Report' ).reset()

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

export default injectIntl( report )
