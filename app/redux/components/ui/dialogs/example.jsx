import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import _ from 'underscore'

import DIV from 'components/tags/div'
import IMG from 'components/tags/img'

import style from './_example'

class example extends Component {

	static propTypes = {

		examples: PropTypes.array,
		type: PropTypes.string,

		fetchExamples: PropTypes.func

	}

	componentDidMount (){

		let { fetchExamples, examples } = this.props
		
		if( !examples.length ){

			fetchExamples()

		}
		
	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

	}

	render () {

		const { examples, type } = this.props

		if( !examples.length ){

			return null

		}else{

			const examplesOfType = _.findWhere( examples, { type: type } )
			const uids = examplesOfType.uids.split( ',' )
			const images = _composeImages( uids, type )

			return (
				
				<DIV className={ style.container } >
					{ images }
				</DIV>

			)

		}

	}

}

const _composeImages = ( uids, type ) => {

	return _.map( uids, ( uid, key ) => {

		return React.createElement( IMG, {

			key: key,
			src: './uploads/' + uid + '.jpg',
			alt: 'Coastwards example: ' + type

		} )

	} )

}

export default example