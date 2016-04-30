import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import { Button } from 'react-toolbox/lib/button';

import style from './_styleUpload';

import MapboxGL from '../../utils/MapboxGL/MapboxGL';

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
				<Button icon="add" floating accent className={ style.uploadBtn } />
				<MapboxGL  className={ style.map } />  
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
