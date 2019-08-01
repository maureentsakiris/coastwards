import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import DIV from 'components/tags/div'

export default class MapboxGL extends Component {

	static propTypes = {

		className: PropTypes.string,
		map: PropTypes.object,

		displayMap: PropTypes.func,
		disableAndreasPinch: PropTypes.func

	}

	shouldComponentUpdate ( ){

		return false

	}

	componentDidMount (){

		this.props.displayMap()
		//this.props.disableAndreasPinch()

	}

	constructor ( props ) {

		super ( props )

	}

	render () {

		const { className } = this.props

		return(

			<DIV id="Mapbox" className={ className } ></DIV>

		)

	}

}
