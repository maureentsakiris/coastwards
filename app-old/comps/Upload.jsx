import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { /*defineMessages,*/ injectIntl, intlShape } from 'react-intl';

import UploadForm from './UploadForm';
import Leaflet from '../utils/Leaflet/Leaflet.jsx';

/*const messages = defineMessages( {

	upload_images:{
		id: 'upload_images',
		description: '0 - h2',
		defaultMessage: 'Upload Images'
	},
	guidelines:{
		id: 'guidelines',
		description: '0 - ',
		defaultMessage: 'We are doing our best to make it as easy as possible for you but there are some guidelines for you to follow'
	}

} );*/

class Upload extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		/*const { formatMessage } = this.props.intl;*/

		return (

			<div>
				<Leaflet />
				<UploadForm />
			</div>

		)

	}

}

Upload.propTypes = {

	intl: intlShape.isRequired

};

Upload.defaultProps = {

	

};

Upload.contextTypes = {

	

};

export default injectIntl( Upload );
