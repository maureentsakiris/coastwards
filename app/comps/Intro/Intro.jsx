import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { IconButton } from 'react-toolbox/lib/button';

import style from './_styleIntro';

import logo from '../../../public/assets/coastwards-alpha.png'; 


const messages = defineMessages( {

	intro_1:{
		id: "intro_1",
		description: "0 - Intro (Super duper important)",
		defaultMessage: "Help Science study the risks of sea-level rise"
	},
	intro_2:{
		id: "intro_2",
		description: "0 - ",
		defaultMessage: "by uploading pictures of coasts"
	},
	tagline:{
		id: "tagline",
		description: "0 - Tagline",
		defaultMessage: "No account. Just drag & drop."
	}
	

} );

class Intro extends Component {

	static propTypes = {

		onArrowClick: PropTypes.func

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const { formatMessage } = this.props.intl;

		return (

			<div id="Intro" className={ style.intro }>
				<div className={ style.inner }>
					<img className={ style.logo } src={ logo } />
					<h1 className={ style.headline }>{ formatMessage( messages.intro_1 ) }<br/><span>{ formatMessage( messages.intro_2 ) }</span></h1>
					<p className={ style.tagline }>{ formatMessage( messages.tagline ) }</p>
					<IconButton className={ style.down } icon="expand_more" accent onClick={ this.props.onArrowClick } />
				</div>
			</div>

		)

	}

}

Intro.propTypes = {

	intl: intlShape.isRequired

};

Intro.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Intro );
