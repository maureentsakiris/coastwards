import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

// import MapTo from '../utils/MapTo';
// import Faq from './Faq';

const messages = defineMessages( {

	faqs:{
		id: 'faqs',
		description: '0',
		defaultMessage: 'FAQss'
	}
	
} );


class Faqs extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { formatMessage } = this.props.intl;

		/*const faqs = [
			{ question: 'question_01', answer: 'answer_01', priority: 0 },
			{ question: 'question_02', answer: 'answer_02', priority: 3 },
			{ question: 'question_03', answer: 'answer_03', priority: 2 }
		];*/

		/*const propsMapTo = {

			dataArray: faqs,
			sortBy: 'priority'

		}*/

		return (

			<div className="faqs-card mdl-card mdl-shadow--2dp">
				<div className="mdl-card__title mdl-card--expand">
					<h2 className="mdl-card__title-text">{ formatMessage( messages.faqs ) }</h2>
				</div>
			</div>

		)

	}

}

Faqs.propTypes = {

	intl: intlShape.isRequired

};

export default injectIntl( Faqs );
