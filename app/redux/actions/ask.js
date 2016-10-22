import * as types from 'types'

export function submit ( ){

	return function ( dispatch ){

		console.log( "submitting" )

		/*import nodemailer from 'nodemailer'

		const transporter = nodemailer.createTransport( 'smtps://info@maureentsakiris.com:Xx7317990B!@6ykn-r2f5.accessdomain.com' )

		const mailOptions = {

			from: '"Momo" <maureen@theyard.eu>',
			to: '"Coastwards" <info@maureentsakiris.com>',
			subject: "JUHUUU",
			text: "this is the text"

		}

		transporter.sendMail( mailOptions, function ( error, info ){

			if( error ){

				return console.log( error )

			}
				
			console.log( 'Message sent: ' + info.response );

		} )*/

	}

}