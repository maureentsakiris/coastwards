import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import Sticky from 'react-stickynode';
import Scroll from 'react-scroll';

import Intro from '../Intro/Intro';
import Info from '../Info/Info';

import Upload from '../Upload/Upload';
import How from '../How/How';
import Guidelines from '../Guidelines/Guidelines';
import Team from '../Team/Team';
import FAQs from '../FAQs/FAQs';


import style from './_styleApp';

const scroller = Scroll.scroller;

class App extends Component {

	static propTypes = {

		className: PropTypes.string

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			content: 'upload'

		}

	}

	render () {

		const { className } = this.props;
		const { content } = this.state;

		const cls = Classnames( style.app, className );

		const clsUpload = Classnames( style.hide, {

			[ style.show ]: this.state.content == 'upload'

		} )

		const clsHow = Classnames( style.hide, {

			[ style.show ]: this.state.content == 'how'

		} )

		const clsGuidelines = Classnames( style.hide, {

			[ style.show ]: this.state.content == 'guidelines'

		} )

		const clsTeam = Classnames( style.hide, {

			[ style.show ]: this.state.content == 'team'

		} )

		const clsFAQs = Classnames( style.hide, {

			[ style.show ]: this.state.content == 'faqs'

		} )

		/*<Sticky id="InfoStick" enableTransforms={ true } className={ style.sticky }>
					<Info onTabClick={ this._loadContent } />
				</Sticky>*/

		const stick = content == 'upload' ? false : true;

		return (

			<div id="App" className={ cls }>
				<Intro onArrowClick={ this._scrollToContent } />
				<Sticky enabled={ stick } id="InfoStick" enableTransforms={ true } className={ style.sticky }>
					<Info onTabClick={ this._loadContent } />
				</Sticky>
				<div id="Content" className={ style.content }>
					<Upload className={ clsUpload } />
					<How className={ clsHow } />
					<Guidelines className={ clsGuidelines } />
					<Team className={ clsTeam } />
					<FAQs className={ clsFAQs } />
				</div>
			</div>

		)

	}

	_scrollToContent = ( ) => {

		scroller.scrollTo( "Content", { smooth: true } );

	}

	_jumpToContent = ( ) => {

		scroller.scrollTo( "Content", { smooth: false, offset: -65 } );

	}

	_loadContent = ( comp ) => {

		this.setState( { content: comp }, this._jumpToContent );

	}

}

App.propTypes = {

	intl: intlShape.isRequired

};

App.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( App );
