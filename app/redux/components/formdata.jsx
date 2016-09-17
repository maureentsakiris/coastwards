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

import TOGGLE from 'components/ui/toggle'

import cls from './_formdata.scss'

const messages = defineMessages( {
	
	//privacy
	data_privacy:{
		id: "data_privacy",
		description: "Header - Gives user the opportunity to see exactly what information is beind sent to our servers",
		defaultMessage: "See what other information will be sent to our servers"
	}


} )

const formdata = ( { intl, image, imageWidth, showDialog } ) => {

	const { formatMessage } = intl

	const exifTable = _.map( image.exifdata, ( exif, key ) => {

		const data = exif.toString()

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

	/*const adaptations = [

		{ label: "!Dike", value: "dike" },
		{ label: "!Wave-breaker", value: "wavebreaker" }

	]*/

	return(

		<TOGGLE priority={ 6 } text={ formatMessage( messages.data_privacy ).toUpperCase() } >
			<TABLE className={ cls.table } >
				<THEAD>
					<TR>
						<TH>IP Address</TH>
						<TH></TH>
					</TR>
				</THEAD>
				<TBODY>
					<TR>
						<TD>IP Address</TD>
						<TD>We will save your IP Address upon upload <A onClick={ showDialog.bind( this, 'WHYIP' ) }>WHY?</A></TD>
					</TR>
				</TBODY>
				<THEAD>
					<TR>
						<TH>Image</TH>
						<TH></TH>
					</TR>
				</THEAD>
				<TBODY>
					<TR>
						<TD>Image</TD>
						<TD>We save the image at { imageWidth } pixels width and give it a new unique filename</TD>
					</TR>
					<TR>
						<TD>Latitude</TD>
						<TD>{ image.lat }</TD>
					</TR>
					<TR>
						<TD>Longitude</TD>
						<TD>{ image.long }</TD>
					</TR>
					<TR>
						<TD>Location manual</TD>
						<TD>{ image.manual }</TD>
					</TR>
					<TR>
						<TD>Date/Time</TD>
						<TD>{ datetime }</TD>
					</TR>
				</TBODY>
				<THEAD>
					<TR>
						<TH>Annotations</TH>
						<TH>Score</TH>
					</TR>
				</THEAD>
				<TBODY>
					{ labelsTable }
				</TBODY>
				<THEAD>
					<TR>
						<TH>Exifdata</TH>
						<TH>Value</TH>
					</TR>
				</THEAD>
				<TBODY>
					{ exifTable }
				</TBODY>
			</TABLE>
		</TOGGLE>

	)
	
}

formdata.propTypes = {

	intl: intlShape.isRequired,

	image: PropTypes.object,
	imageWidth: PropTypes.number,

	showDialog: PropTypes.func

}

export default injectIntl( formdata )

