import React, { Component, PropTypes } from 'react'

import DIV from 'components/tags/div'

export default class MapboxGL extends Component {

	static propTypes = {

		className: PropTypes.string,

		displayMap: PropTypes.func

	}

	shouldComponentUpdate ( ){

		return false

	}

	componentDidMount (){

		this.props.displayMap()

	}

	constructor ( props ) {

		super ( props )
		this.map

	}

	render () {

		const { className } = this.props

		return(

			<DIV id="Mapbox" className={ className } ></DIV>

		)


	}

}
