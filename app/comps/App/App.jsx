import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { injectIntl, intlShape } from 'react-intl';
import Sticky from 'react-stickynode';
import Scroll from 'react-scroll';

import Intro from '../Intro/Intro';
import Info from '../Info/Info';
import Upload from '../Upload/Upload';

import style from './_styleApp';

const scroller = Scroll.scroller;

class App extends Component {

	componentWillMount (){

		let content = React.createElement( Upload );
		this.setState( { content: content } );

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			content: ''

		}

	}

	render () {

		return (

			<div id="App" className={ style.app }>
				<Intro onArrowClick={ this._scrollToInfo } />
				<Sticky enableTransforms={ true } className={ style.sticky }>
					<Info onTabClick={ this._loadContent } />
				</Sticky>
				<div id="Content" className={ style.content }>
					{ this.state.content }
				</div>
			</div>

		)

	}

	_scrollToInfo = ( ) => {

		scroller.scrollTo( "Info", { smooth: true } );

	}

	_loadContent = ( comp ) => {

		let content = React.createElement( comp );
		this.setState( { content: content } );
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
