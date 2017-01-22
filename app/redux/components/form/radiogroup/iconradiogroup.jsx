import React, { Component, PropTypes } from 'react'
import _ from 'underscore'

import hoc from 'components/form/hoc'
import DIV from 'components/tags/div'
import ICONRADIO from 'components/form/radiogroup/iconradio'


class iconradiogroup extends Component {

	static propTypes = {

		hocProps: PropTypes.shape( {

			jazz: PropTypes.bool,
			form: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,

			onClick: PropTypes.func,
			options: PropTypes.array.isRequired,
			className: PropTypes.string,
			defaultChecked: PropTypes.bool

		} )

	}

	constructor ( props ) {

		super ( props )

		this.state = {

			checked: this.props.hocProps.defaultChecked

		}

	}

	render () {

		const { form, name, options, className } = this.props.hocProps

		const radios = this._renderOptions( form, name, options )

		return(

			<DIV className={ className } >
				{ radios }
			</DIV>

		)

	}

	_onClick = ( key, value ) => {

		let { onClick } = this.props.hocProps
		this.setState( { checkedKey: key } )
		onClick( value )

	}

	_renderOptions = ( form, name, options ) => {

		let { checkedKey } = this.state
		let { jazz } = this.props.hocProps

		return _.map( options, ( option, key ) => {

			let { label, value, color } = option
			let checked = checkedKey == key ? true : false

			return React.createElement( ICONRADIO, {

				key: key,
				jazz: jazz,
				index: key,
				form: form, 
				label: label,
				name: name,
				value: value,
				onClick: this._onClick,
				checked: checked,
				backgroundColor: color

			} )

		} )

	}
	
}

export default hoc( iconradiogroup );