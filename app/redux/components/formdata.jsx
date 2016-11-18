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

import cls from './_formdata.scss'

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
		defaultMessage: "That's it"
	}


} )

const formdata = ( { intl, image, uid, imageWidth, showDialog } ) => {

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

		<TOGGLE priority={ 4 } text={ formatMessage( messages.data_privacy ) } >
			<TABLE className={ cls.table } >
				<THEAD>
					<TR>
						<TH style={ { width: '160px', paddingTop: '0' } } >IP Address</TH>
						<TH style={ { paddingTop: '0' } }></TH>
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
						<TD>We save the image at { imageWidth } pixels width and strip the metadata</TD>
					</TR>
					<TR>
						<TD>Unique identifier</TD>
						<TD>{ uid }</TD>
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

