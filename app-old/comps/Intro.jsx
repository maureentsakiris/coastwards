import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';


const messages = defineMessages( {

	intro:{
		id: "intro",
		description: "0 - Intro title (Super duper important)",
		defaultMessage: "Help Science study the risks of sea-level rise by uploading pictures of coasts."
	},
	intro_sub:{
		id: "intro_sub",
		description: "0 - Intro subtitle (Also super duper important)",
		defaultMessage: "No account. Just drag & drop!"
	},
	intro_sub_alt:{
		id: "intro_sub_alt",
		description: "0 - Alternative subtitle in case user's browser doesn't support draganddrop",
		defaultMessage: "No account. Just a simply file upload!"
	}
	
} );

class Intro extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { formatMessage } = this.props.intl;
		const sub = this.context.draganddrop ? formatMessage( messages.intro_sub ) : formatMessage( messages.intro_sub_alt );

		return (

			<div className="vertical-align limit-width">
				<h1 className="mdl-typography--display-3">{ formatMessage( messages.intro ) }</h1>
				<p className="mdl-typography--headline">{ sub }</p>
			</div>

		)

	}

}

Intro.contextTypes = {

	draganddrop: PropTypes.bool

}

Intro.propTypes = {

	intl: intlShape.isRequired

};

export default injectIntl( Intro );
