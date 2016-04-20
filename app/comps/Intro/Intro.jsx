import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';

import style from './_styleIntro';

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
					<h1>{ formatMessage( messages.intro ) }</h1>
					<p>{ formatMessage( messages.tagline ) }</p>
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
