import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import Form from '../utils/Form/Form';
import FormDropzone from '../utils/Form/FormDropzone';
import FormSubmit from '../utils/Form/FormSubmit';

const messages = defineMessages( {

	warning_max:{
		id: "warning_max",
		description: "FormDropzone - ",
		defaultMessage: "Slow down cowboy, you can only upload %s images at once. But you can repeat the process as many times as you like ;)"
	},
	warning_accept:{
		id: "warning_accept",
		description: " - ",
		defaultMessage: "Sorry! Some of the images you dropped are not images and will be ignored."
	}

} );

class UploadForm extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

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


		const { formatMessage } = this.props.intl;

		return (

			<Form name="uploadForm" noValidate>
				<FormDropzone 
					name="dropzone"
					accept="image/*"
					warning_accept={ formatMessage( messages.warning_accept ) }
					multiple={ true }
					required
					fileValidations={ fileValidations }
					warning_max= { formatMessage( messages.warning_max ) }
					prompt="Drop your images anywhere on the page!!!"
				/>
				<FormSubmit name="submit">Upload your images</FormSubmit>
			</Form>

		)

	}

}

UploadForm.propTypes = {

	intl: intlShape.isRequired

};

UploadForm.defaultProps = {

	

};

UploadForm.contextTypes = {

	draganddrop: PropTypes.bool

};

export default injectIntl( UploadForm );
