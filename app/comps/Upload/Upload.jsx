import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';

import style from './_styleUpload';

import FormTB from '../../utils/FormTB/FormTB/FormTB';
import DropzoneTB from '../../utils/FormTB/DropzoneTB/DropzoneTB';
import MapboxGL from '../../utils/MapboxGL/MapboxGL';

const messages = defineMessages( {

	dropzone_prompt:{
		id: "dropzone_prompt",
		description: "0 - ",
		defaultMessage: "Drag & drop your images anywhere on the map (or click)"
	},
	prompt:{
		id: "prompt",
		description: "0 - ",
		defaultMessage: "Click anywhere to upload your pictures"
	},
	warning_accept:{
		id: "warning_accept",
		description: "0 - ",
		defaultMessage: "The file you dropped has the wrong extension. Allowed filetypes are: JPG, JPEG or TIFF."
	},
	warning_max:{
		id: "warning_max",
		description: "0 - ",
		defaultMessage: "Sorry, we can only process one image at a time! (We are working on it)" 
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

		const { formatMessage } = this.props.intl;

		const cls = Classnames( style.upload );
		const clsForm = Classnames( style.form );

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
		
		return (

			<div id="Upload" className={ cls }>
				<FormTB name="upload" className={ clsForm } >
					<DropzoneTB
						name="dropzone" 
						promptDnD={ formatMessage( messages.dropzone_prompt ) }
						promptClick={ formatMessage( messages.prompt ) }
						warning_accept={ formatMessage( messages.warning_accept ) }
						multiple={ false }
						warning_max={ formatMessage( messages.warning_max ) }
						className={ style.dropzone }
						fileValidations={ fileValidations }
						max={ 100 }
					/>
				</FormTB>
				<MapboxGL  className={ style.map } />  
			</div>

		)

	} 

}  

Upload.propTypes = {

	intl: intlShape.isRequired

};

Upload.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Upload );
