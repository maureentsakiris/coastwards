import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';

import style from './_styleUpload';

import Leaflet from '../../utils/Leaflet/Leaflet';

const messages = defineMessages( {

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

		return (

			<div id="Upload" className={ cls }>
				<Leaflet  />
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

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Upload );
