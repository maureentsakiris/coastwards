import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { FormattedNumber, injectIntl } from 'react-intl'

import DIV from 'components/tags/div'

import style from './_counter'

class counter extends Component {

	static propTypes = {

		count: PropTypes.number,
		show: PropTypes.bool,

		getCount: PropTypes.func

	}

	componentDidMount (){

		this.props.getCount()

	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

	}

	render () {

		const { count, show } = this.props

		if( !count || !show ){

			return null

		}else{

			return (
				
				<DIV id="Counter" className={ style.counter } >
					<FormattedNumber value={ count }/>
				</DIV>

			)

		}

	}

}

export default injectIntl( counter )