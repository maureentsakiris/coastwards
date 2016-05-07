import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import { Button } from 'react-toolbox/lib/button';

import style from './_styleUpload';

import FormTB from '../../utils/FormTB/FormTB/FormTB';
import DropzoneTB from '../../utils/FormTB/DropzoneTB/DropzoneTB';
import MapboxGL from '../../utils/MapboxGL/MapboxGL';

const messages = defineMessages( {

	dropzone_prompt_drag:{
		id: "dropzone_prompt_drag",
		description: "0 - ",
		defaultMessage: "Drag your images anywhere onto the map (or click)"
	},
	dropzone_prompt_drop:{
		id: "dropzone_prompt_drop",
		description: "0 - ",
		defaultMessage: "And now drop!"
	},
	dropzone_prompt_click:{
		id: "dropzone_prompt_click",
		description: "0 - ",
		defaultMessage: "Click anywhere to upload your pictures"
	},
	dropzone_prompt_blocked:{
		id: "dropzone_prompt_blocked",
		description: "0 - ",
		defaultMessage: "Processing ... please wait until finished to drop more images"
	},
	dropzone_warning_accept:{
		id: "warning_accept",
		description: "0 - ",
		defaultMessage: "One or more files are not images and will be ignored!"
	},
	dropzone_warning_max:{
		id: "warning_max",
		description: "0 - ",
		defaultMessage: "Sorry, we can only process one image at a time! (We are working on it)" 
	},
	mapbox_warning_unsupported_title:{
		id: "mapbox_warning_unsupported_title",
		description: "1 - ",
		defaultMessage: "That's too bad ..."
	},
	mapbox_warning_unsupported_message:{
		id: "mapbox_warning_unsupported_message",
		description: "1 - ",
		defaultMessage: "Your browser does not support the web technology necessary to display the world map. We recommend you upgrade your browser to the latest version!"
	}
	

} );

class Upload extends Component {


	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		} 

	}

	render () {

		const { formatMessage, locale } = this.props.intl;
		const { className } = this.props;

		const cls = Classnames( style.upload, className );
		const clsControls = Classnames( style.controls );
		const clsForm = Classnames( style.fill, style.form );
		const clsMap = Classnames( style.fill, style.map );

		const fileValidations = [
			{
				methodName: "imageHasLocation",
				options: { required: true, passesWhen: true },
				label: "Location",
				description: "Checking image for information on the location it was taken",
				success: "Yay! We know where that coast is",
				error: "Err, looks like we can't extract the location from the metadata"
			},
			{
				methodName: "imageWithFlash",
				options: { required: true, passesWhen: false },
				label: "No flash",
				description: "Checking whether the image was taken with flash",
				success: "Great! No flash, that means it was probably taken with enough ambient light",
				error: "Err, flash was used to take this image"
			},
			{
				methodName: "imageHasColor",
				options: { color: "blue", required: true, passesWhen: true },
				label: "Color blue",
				description: "Checking whether the image has the color blue (water)",
				success: "Great! There is blue in the image.",
				error: "We couldn't find the color blue"
			}
		]

		/*<FormTB name="upload" className={ clsForm } >
					<DropzoneTB
						name="dropzone" 
						promptDrag={ formatMessage( messages.dropzone_prompt_drag ) }
						promptDrop={ formatMessage( messages.dropzone_prompt_drop ) }
						promptClick={ formatMessage( messages.dropzone_prompt_click ) }
						promptBlocked={ formatMessage( messages.dropzone_prompt_blocked ) }
						warning_accept={ formatMessage( messages.dropzone_warning_accept ) }
						multiple={ false }
						warning_max={ formatMessage( messages.dropzone_warning_max ) }
						className={ style.dropzone }
						fileValidations={ fileValidations }
						max={ 1 }
					/>
				</FormTB>*/
		
		return (

			<div id="Upload" className={ cls }>
				<MapboxGL
					className={ clsMap }
					unsupportedTitle={ formatMessage( messages.mapbox_warning_unsupported_title ) }
					unsupportedMessage={ formatMessage( messages.mapbox_warning_unsupported_message ) }
					language={ locale }
					scrollZoom={ true }
					zoom={ 0 }
					center={ [ 150, 39 ] }
					maxBounds={ [ [ 360, 84 ], [ -360, -68 ] ] }
					attributionControl={ false }
					style="mapbox://styles/maureentsakiris/cinxhoec70043b4nmx0rkoc02"
					accessToken="pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA"
				/>
				<div id="Controls" className={ clsControls }>
					<Button icon="zoom_in" floating accent mini />
					<Button icon="zoom_out" floating accent mini />
				</div>
			</div>

		)

	} 

}  

Upload.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string

};

Upload.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Upload );
