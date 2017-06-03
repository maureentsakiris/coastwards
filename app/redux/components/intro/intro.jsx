import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import _ from 'underscore'

import DIV from 'components/tags/div'
import style from './_intro'

const messages = defineMessages( {

	show_your_love:{
		id: "show_your_love",
		description: "H",
		defaultMessage: "Show your love."
	}

} )

class intro extends Component {

	static propTypes = {

		intl: intlShape.isRequired, 
		images: PropTypes.array,

		getIntro: PropTypes.func

	}

	componentDidMount (){

		this.props.getIntro()

	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

	}

	render () {

		const { formatMessage } = this.props.intl
		const { images } = this.props

		const grid = _composeGrid( images )

		if( !images.length ){

			return null

		}else{

			return (
				
				<DIV id="Intro" className={ style.intro } >
					{ grid }
				</DIV>

			)

		}

	}

}

const _composeGrid = ( images ) => {

	return _.map( images, ( image, key ) => {

		let bg = 'url(./uploads/' + image.contribution_uid + '.jpg)'

		return (

			<DIV key={ key } className={ style.image } style={ { backgroundImage: bg } } ></DIV>

		)

	} )

}

export default injectIntl( intro )