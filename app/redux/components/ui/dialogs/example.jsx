import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import _ from 'underscore'
import SwipeableViews from 'react-swipeable-views'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import P from 'components/tags/p'
import BUTTON from 'components/tags/button'
import I from 'components/tags/i'

import style from './_example'

class example extends Component {

	static propTypes = {

		examples: PropTypes.array,
		touchevents: PropTypes.bool,
		type: PropTypes.string,

		fetchExamples: PropTypes.func

	}

	componentWillMount (){

		let { fetchExamples, examples } = this.props
		
		if( !examples.length ){

			fetchExamples()

		}
		
	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

		this.state = {

			index: 0

		}

	}

	render () {

		const { examples, touchevents, type } = this.props

		if( !examples.length ){

			return null

		}else{
			
			const examplesOfType = _.findWhere( examples, { type: type } )
			
			if( !examplesOfType ){

				return (

					<P>Sorry, no examples for this type yet!</P>

				)

			}else{

				const { index } = this.state
				const uids = examplesOfType.uids.split( ',' )
				const images = _composeImages( uids )
				const total = images.length - 1

				const clsSwipeArrow = Classnames( style.swipeArrow, {

					//[ style.touchevents ]: touchevents

				} )

				const config = {

					enableMouseEvents: true,
					index: index

				}
				
				const _prev = () => {

					let newIndex = index == 0 ? total : index - 1
					this.setState( { index: newIndex } )

				}

				const _next = () => {

					let newIndex = index == total ? 0 : index + 1
					this.setState( { index: newIndex } )

				}

				return (
					
					<DIV className={ style.container } >
						<SwipeableViews { ...config } >
							{ images }
						</SwipeableViews>
						{ total > 0 && <BUTTON className={ clsSwipeArrow } style={ { left: 0 } } onClick={ _prev }><I className="material-icons">&#xE314;</I></BUTTON> }
						{ total > 0 && <BUTTON className={ clsSwipeArrow } style={ { right: 0 } } onClick={ _next }><I className="material-icons">&#xE315;</I></BUTTON> }
					</DIV>

				)

			}

		}

	}

}


const _composeImages = ( uids ) => {

	return _.map( uids, ( uid, key ) => {

		let bg = 'url(./uploads/' + uid + '.jpg)'

		return (

			<DIV key={ key } className={ style.slide } style={ { backgroundImage: bg } } ></DIV>

		)

	} )

}

export default example