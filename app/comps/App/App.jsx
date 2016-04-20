import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { injectIntl, intlShape } from 'react-intl';

import Intro from '../Intro/Intro';
import Info from '../Info/Info';
import Upload from '../Upload/Upload';

import style from './_styleApp';

class App extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		return (

			<div id="Content" className={ style.content }>
				<Intro />
				<Info />
				<Upload />
			</div>

		)

	}

}

App.propTypes = {

	intl: intlShape.isRequired

};

App.defaultProps = {

	

};

App.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( App );
