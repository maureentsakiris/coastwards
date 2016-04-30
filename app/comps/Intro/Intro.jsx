import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import { Button, IconButton } from 'react-toolbox/lib/button';

import style from './_styleIntro';

import logo from '../../../public/assets/coastwards.png'; 


const messages = defineMessages( {

	intro:{
		id: "intro",
		description: "0 - Intro (Super duper important)",
		defaultMessage: "Help Science study the risks of sea-level rise by uploading pictures of coasts"
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

		const cls = Classnames( style.intro, style.flexcontainer );
		const corset = Classnames( style.flexitem, style.corset, style.pad );

		return (

			<div id="Intro" className={ cls }>
				<div className={ corset }>
					<img src={ logo } />
					<h1>{ formatMessage( messages.intro ) }</h1>
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

Intro.defaultProps = {

	

};

Intro.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Intro );
