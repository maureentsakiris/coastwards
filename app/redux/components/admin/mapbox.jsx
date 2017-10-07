import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Classnames from 'classnames'
import DIV from 'components/tags/div'

import style from './_mapbox'

export default class MapboxGL extends Component {

	static propTypes = {

		map: PropTypes.object,
		displayMap: PropTypes.func,
		className: PropTypes.string

	}

	shouldComponentUpdate ( ){

		return false

	}

	componentDidMount (){

		this.props.displayMap()

	}

	constructor ( props ) {

		super ( props )

	}

	render () {

		const { className } = this.props

		const clsMap = Classnames( style.mapbox, className )

		return(

			<DIV id="Mapbox" className={ clsMap } style={ style } ></DIV>

		)

	}

}