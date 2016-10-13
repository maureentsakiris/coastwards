import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import SPAN from 'components/tags/span'
import A from 'components/tags/a'

//import style from './_more'

class more extends Component {

	static propTypes = {

		children: PropTypes.node.isRequired,
		more: PropTypes.string.isRequired,
		className: PropTypes.string

	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

		this.state = {

			showMore: false

		}

	}

	render () {

		const { children, more, className, ...restProps } = this.props
		const { showMore } = this.state

		return (

			<SPAN className={ className } { ...restProps } >
				{ !showMore && <A href="#" onClick={ this._toggle } >{ more }</A> }
				{ showMore && <SPAN>{ children }</SPAN> }
			</SPAN>

		)

	}

	_toggle = ( e ) => {

		e.preventDefault()
		/*const { showMore } = this.state
		this.setState( { showMore: !showMore } )*/

	}

}

export default more;