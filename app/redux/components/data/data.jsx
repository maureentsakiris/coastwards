import React from 'react'
import { PropTypes } from 'prop-types'
import { chain } from 'underscore'
import ClassNames from 'classnames'

import DIV from 'components/tags/div'
import STRONG from 'components/tags/strong'
import P from 'components/tags/p'
import H from 'components/tags/h'
import I from 'components/tags/i'
import UL from 'components/tags/ul'
import LI from 'components/tags/li'
import A from 'components/tags/a'
import IMG from 'components/tags/img'

import FORM from 'components/tags/form'
import TOGGLE from 'components/ui/toggle'
import ICONRADIOGROUP from 'components/form/radiogroup/iconradiogroup'
import GO from 'components/form/button/go'

import Mapbox from 'containers/data/mapbox'
import Popup from 'containers/data/popup'

import style from './_data'

const data = ( { materials, material, materialverified, verified, closeup, pointmanual, pointcorrected, setFilter, downloadCSV } ) => {

	const all = [ { label: 'All', value: '%' } ]
	const mats = chain( materials )
		/*.filter( ( material ) => {

			let { value } = material
			return value !== 'notset'

		} )*/
		.filter( ( material ) => {

			let { value } = material
			return value !== 'notclose'

		} )
		.map( ( material ) => {

			let { value, color, label } = material
			return { label: label, value: value, color: color }

		} )
		.value()

	const materialOptions = all.concat( mats )

	const allYesNo = [

		{ label: 'All', value: '%' },
		{ label: 'Yes', value: '1' },
		{ label: 'No', value: '0' }

	]

	const allYesNoNotset = [

		{ label: 'All', value: '%' },
		{ label: 'Yes', value: '1' },
		{ label: 'No', value: '0' },
		{ label: 'Not set', value: 'notset' }

	]

	const clsHelp = ClassNames( "material-icons", style.help )


	return(

		<DIV className={ style.admin }>
			<DIV className={ style.desktop }>
				<A href="http://coastwards.org"><IMG className={ style.logo } src="./assets/coastwards-avatar.png" alt="Logo coastwards: A turtle on a mission" /></A>
				<P>Sorry, this part of the web is not available on small screens. Please visit on a desktop computer!</P>
			</DIV>
			<Popup />
			<DIV className={ style.drawer } >
				<A href="http://coastwards.org"><IMG className={ style.logo } src="./assets/coastwards-avatar.png" alt="Logo coastwards: A turtle on a mission" /></A>
				<FORM className={ style.form } id="Admin" action="javascript:;" onSubmit={ fetch } >
					<H priority={ 1 } >Hi there! Go ahead, make your selection...</H>
					<P>This is the data portal of <A href="http://coastwards.org">coastwards.org</A>. Here you can generate a CSV from the data collected so far by our participants.</P>
					<TOGGLE priority={ 5 } className={ style.more } text="More info" >
						<P>The CSV will include the following information:</P>
						<UL className={ style.ul } >
							<LI><STRONG>id</STRONG> (our internal identifier)</LI>
							<LI><STRONG>uid</STRONG> (the image identifier)</LI>
							<LI><STRONG>longitude</STRONG> of the image</LI>
							<LI><STRONG>latitude</STRONG> of the image</LI>
							<LI><STRONG>verified</STRONG> (whether the contribution has been verified by our staff)</LI>
							<LI><STRONG>material</STRONG> (as selected by the participant)</LI>
							<LI><STRONG>material_verified</STRONG> (by our staff)</LI>
							<LI><STRONG>point_manual</STRONG> (if the image was positioned manually or programatically via the embedded GPS data)</LI>
							<LI><STRONG>point_corrected</STRONG> (whether or not the image position has been corrected by the participant)</LI>
							<LI><STRONG>closeup</STRONG> (whether or not the image has been labelled a closeup -as opposed to a panorama shot- by our staff)</LI>
							<LI><STRONG>comment</STRONG> (of the participant)</LI>
							<LI><STRONG>exif_datetime</STRONG> (of the image as extracted from its EXIF data - if available)</LI>
						</UL>
					</TOGGLE>
					<ICONRADIOGROUP form="Admin" label="Verified: " name="verified" preferPlaceholder={ false } options={ allYesNo } onChange={ setFilter.bind( this, 'SET_VERIFIED' ) } selected={ verified } >
						<I className={ clsHelp } title="Include images verified by our staff">help_outline</I>
					</ICONRADIOGROUP>
					<TOGGLE priority={ 4 } className={ style.toggle } text="Other filters" >
						<ICONRADIOGROUP form="Admin" label="Material contributor: " name="material" preferPlaceholder={ false } options={ materialOptions } onChange={ setFilter.bind( this, 'SET_MATERIAL' ) } selected={ material } >
							<I className={ clsHelp } title="Include images categorized by the participant as one of the following">help_outline</I>
						</ICONRADIOGROUP>
						<ICONRADIOGROUP form="Admin" label="Material verified: " name="materialverified" preferPlaceholder={ false } options={ materialOptions } onChange={ setFilter.bind( this, 'SET_MATERIAL_VERIFIED' ) } selected={ materialverified } >
							<I className={ clsHelp } title="Include images categorized by our staff as one of the following">help_outline</I>
						</ICONRADIOGROUP>
						<ICONRADIOGROUP form="Admin" label="Position manual: " name="pointmanual" preferPlaceholder={ false } options={ allYesNo } onChange={ setFilter.bind( this, 'SET_POINTMANUAL' ) } selected={ pointmanual } >
							<I className={ clsHelp } title="Include images placed manually by the participant (as opposed to programatically via the embedded GPS)">help_outline</I>
						</ICONRADIOGROUP>
						<ICONRADIOGROUP form="Admin" label="Position corrected: " name="pointcorrected" preferPlaceholder={ false } options={ allYesNo } onChange={ setFilter.bind( this, 'SET_POINTCORRECTED' ) } selected={ pointcorrected } >
							<I className={ clsHelp } title="Include images where the location has been corrected by the participant">help_outline</I>
						</ICONRADIOGROUP>
						<ICONRADIOGROUP form="Admin" label="Closeup: " name="closeup" preferPlaceholder={ false } options={ allYesNoNotset } onChange={ setFilter.bind( this, 'SET_CLOSEUP' ) } selected={ closeup } >
							<I className={ clsHelp } title="Include images labelled as a closeup by our staff (as opposed to a panorama shot)">help_outline</I>
						</ICONRADIOGROUP>
					</TOGGLE>
					<GO onClick={ downloadCSV } label="DOWNLOAD CSV" className={ style.download } />
				</FORM>
			</DIV>
			<Mapbox className={ style.mapbox } />
		</DIV>

	)

}

data.propTypes = {

	materials: PropTypes.array,
	material: PropTypes.string,
	materialverified: PropTypes.string,
	verified: PropTypes.string,
	closeup: PropTypes.string,
	pointmanual: PropTypes.string,
	pointcorrected: PropTypes.string,

	setFilter: PropTypes.func,
	downloadCSV: PropTypes.func

}

export default data