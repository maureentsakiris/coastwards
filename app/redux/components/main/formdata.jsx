import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import _ from 'underscore'

import TABLE from 'components/tags/table'
import THEAD from 'components/tags/thead'
import TBODY from 'components/tags/tbody'
import TH from 'components/tags/th'
import TR from 'components/tags/tr'
import TD from 'components/tags/td'
import A from 'components/tags/a'
import P from 'components/tags/p'
import STRONG from 'components/tags/strong'
import BR from 'components/tags/br'

import TOGGLE from 'components/ui/toggle'

import style from './_formdata.scss'

const messages = defineMessages( {
	
	//privacy
	data_privacy:{
		id: "data_privacy",
		description: "Header - Gives user the opportunity to see exactly what information is beind sent to our servers",
		defaultMessage: "What other information do you collect?"
	},
	thats_it:{
		id: "thats_it",
		description: "Note",
		defaultMessage: "That's it. I swear. No cookies, not even Google Analytics, just what you see above."
	},
	ip_address:{
		id: 'ip_address',
		description: "Note",
		defaultMessage: "IP Address"
	},
	save_ip:{
		id: 'save_ip',
		description: "Note",
		defaultMessage: "We will save your IP Address upon upload"
	},
	save_ip_why:{
		id: 'save_ip_why',
		description: "Note",
		defaultMessage: "WHY?"
	},
	image:{
		id: 'image',
		description: "Note",
		defaultMessage: "Image"
	},
	save_image:{
		id: "save_image",
		description: "Note",
		defaultMessage: "We save the image at {imageWidth} pixels width and strip the metadata"
	},
	uid:{
		id: "uid",
		description: "Note",
		defaultMessage: "Unique identifier"
	},
	latitude:{
		id: "latitude",
		description: "Note",
		defaultMessage: "Latitude"
	},
	longitude:{
		id: "longitude",
		description: "Note",
		defaultMessage: "Longitude"
	},
	location_manual:{
		id: "location_manual",
		description: "Note",
		defaultMessage: "Location manual"
	},
	location_corrected:{
		id: "location_corrected",
		description: "Note",
		defaultMessage: "Location corrected"
	},
	date_time:{
		id: "date_time",
		description: "Note",
		defaultMessage: "Date/Time"
	},
	annotations:{
		id: "annotations",
		description: "Note",
		defaultMessage: "Annotations"
	},
	score:{
		id: "score",
		description: "Note",
		defaultMessage: "Score"
	},
	exifdata:{
		id: "exifdata",
		description: "Note",
		defaultMessage: "Exifdata"
	},
	value:{
		id: "value",
		description: "Note",
		defaultMessage: "Value"
	}

} )

//TODO: SHOULD BE SPLIT INTO JAZZ AND NOJAZZ

const formdata = ( { intl, image, uid, imageWidth, showDialog } ) => {

	const { formatMessage } = intl

	//UPDATE ALSO IN MAIN.JS (uploadImage)
	const cleanExif = _.omit( image.exifdata, [ 'MakerNote', 'undefined', 'Artist', 'Copyright' ] )

	const exifTable = _.map( cleanExif, ( exif, key ) => {

		const data = exif !== undefined ? exif.toString() : 'undefined'

		return(

			<TR key={ key }>
				<TD>{ key }</TD>
				<TD>{ data }</TD>
			</TR>

		)

	} )


	const labelsTable = _.map( image.labels, ( label, key ) => {

		return(

			<TR key={ key }>
				<TD>{ label.description }</TD>
				<TD>{ label.score }</TD>
			</TR>

		)

	} )

	const datetime =  image.exifdata ? image.exifdata.DateTimeOriginal ||  image.exifdata.DateTimeDigitized ||  image.exifdata.DateTime : 'not found'

	return(

		<TOGGLE priority={ 6 } text={ formatMessage( messages.data_privacy ) } className={ style.toggle } >
			<TABLE className={ style.table } >
				<THEAD>
					<TR>
						<TH style={ { width: '160px' } } >{ formatMessage( messages.ip_address ) }</TH>
						<TH></TH>
					</TR>
				</THEAD>
				<TBODY>
					<TR>
						<TD>{ formatMessage( messages.ip_address ) }</TD>
						<TD>{ formatMessage( messages.save_ip ) } <A onClick={ showDialog.bind( this, 'WHYIP' ) }>{ formatMessage( messages.save_ip_why ) }</A></TD>
					</TR>
				</TBODY>
				<THEAD>
					<TR>
						<TH>{ formatMessage( messages.image ) }</TH>
						<TH></TH>
					</TR>
				</THEAD>
				<TBODY>
					<TR>
						<TD>{ formatMessage( messages.image ) }</TD>
						<TD>{ formatMessage( messages.save_image, { imageWidth: imageWidth } ) }</TD>
					</TR>
					<TR>
						<TD>{ formatMessage( messages.uid ) }</TD>
						<TD>{ uid }</TD>
					</TR>
					<TR>
						<TD>{ formatMessage( messages.latitude ) }</TD>
						<TD>{ image.lat }</TD>
					</TR>
					<TR>
						<TD>{ formatMessage( messages.longitude ) }</TD>
						<TD>{ image.long }</TD>
					</TR>
					<TR>
						<TD>{ formatMessage( messages.location_manual ) }</TD>
						<TD>{ image.manual }</TD>
					</TR>
					<TR>
						<TD>{ formatMessage( messages.location_corrected ) }</TD>
						<TD>{ image.corrected }</TD>
					</TR>
					<TR>
						<TD>{ formatMessage( messages.date_time ) }</TD>
						<TD>{ datetime }</TD>
					</TR>
				</TBODY>
				<THEAD>
					<TR>
						<TH>{ formatMessage( messages.annotations ) }</TH>
						<TH>{ formatMessage( messages.score ) }</TH>
					</TR>
				</THEAD>
				<TBODY>
					{ labelsTable }
				</TBODY>
				<THEAD>
					<TR>
						<TH>{ formatMessage( messages.exifdata ) }</TH>
						<TH>{ formatMessage( messages.value ) }</TH>
					</TR>
				</THEAD>
				<TBODY>
					{ exifTable }
				</TBODY>
			</TABLE>
			<BR/><BR/>
			<P><STRONG>{ formatMessage( messages.thats_it ) }</STRONG></P>
			<BR/>
		</TOGGLE>

	)
	
}

formdata.propTypes = {

	intl: intlShape.isRequired,

	image: PropTypes.object,
	uid: PropTypes.string,
	imageWidth: PropTypes.number,

	showDialog: PropTypes.func

}

export default injectIntl( formdata )