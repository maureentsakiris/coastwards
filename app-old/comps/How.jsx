import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Button from '../utils/MDL/Button';


const messages = defineMessages( {

	show_transcript:{
		id: 'show_transcript',
		description: '0 - ',
		defaultMessage: 'show_transcript'
	},
	hide_transcript:{
		id: 'hide_transcript',
		description: '0 - ',
		defaultMessage: 'hide_transcript'
	},
	faqs:{
		id: 'faqs',
		description: '0 - ',
		defaultMessage: 'Faqs'
	},
	any_questions:{
		id: 'any_questions',
		description: '0 - ',
		defaultMessage: 'Any Questions?'
	},
	how_does_a_picture_help:{
		id: 'how_does_a_picture_help',
		description: ' - ',
		defaultMessage: 'How does a picture help?'
	}

} );

class How extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );
		
	}

	render () {

		const { formatMessage } = this.props.intl;

		/*const propsVimeo = {

			vimeoSrc: 'https://player.vimeo.com/video/39050404'

		}*/

		return (

			<div className="how-card mdl-card mdl-shadow--2dp">
				<div className="mdl-card__title mdl-card--expand">
					<h2 className="mdl-card__title-text">
						{ formatMessage( messages.how_does_a_picture_help ) }
						<i className="material-icons">&#xE5CF;</i>
					</h2>
				</div>
				
			</div>

		)

	}

}

How.propTypes = {

	intl: intlShape.isRequired

};

export default injectIntl( How );
