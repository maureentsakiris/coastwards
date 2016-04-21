import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Toggle, ToggleLink, ToToggle } from '../utils/Toggle';

const messages = defineMessages( {

	question_01:{
		id: 'question_01',
		description: '0 - ',
		defaultMessage: 'question_01'
	},
	answer_01:{
		id: 'answer_01',
		description: '0 - ',
		defaultMessage: 'answer_01'
	},
	question_02:{
		id: 'question_02',
		description: '0 - ',
		defaultMessage: 'question_02'
	},
	answer_02:{
		id: 'answer_02',
		description: '0 - ',
		defaultMessage: 'answer_02'
	},
	question_03:{
		id: 'question_03',
		description: '0 - ',
		defaultMessage: 'question_03'
	},
	answer_03:{
		id: 'answer_03',
		description: '0 - ',
		defaultMessage: 'answer_03'
	}

} );

class Faq extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { formatMessage } = this.props.intl;

		return (

			<div>
				<Toggle>
					<ToggleLink toggles={false}><span>{ formatMessage( messages[ this.props.data.question ] ) }</span></ToggleLink>
					<ToToggle>
						<p>{ formatMessage( messages[ this.props.data.answer ] ) }</p>
					</ToToggle>
				</Toggle>
			</div>

		)

	}

}

Faq.propTypes = {

	intl: intlShape.isRequired,
	data: PropTypes.object

};

export default injectIntl( Faq );
