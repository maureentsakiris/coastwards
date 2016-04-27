import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { injectIntl, intlShape } from 'react-intl';
import Scroll from 'react-scroll';

import Intro from '../Intro/Intro';
import Info from '../Info/Info';
import Upload from '../Upload/Upload';
import Footer from '../Footer/Footer';

import style from './_styleApp';

const scroller = Scroll.scroller;
const Element = Scroll.Element;

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
				<Intro scrollToInfo={ this._scrollToInfo } />
				<Element name="Info"><Info /></Element>
				<Upload />
			</div>

		)

	}

	_scrollToInfo = ( ) => {

		scroller.scrollTo( "Info", { smooth: true } );

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
