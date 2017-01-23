import React, { PropTypes } from 'react'
import _ from 'underscore'

import hoc from 'components/form/hoc'
import DIV from 'components/tags/div'
import ICONRADIO from 'components/form/radiogroup/iconradio'

const iconradiogroup = ( { hocProps } ) => {

	const { form, name, options, checkedValue, className, onClick } = hocProps
	const radios = _renderOptions( form, name, options, checkedValue, onClick )

	return(

		<DIV className={ className } >
			{ radios }
		</DIV>

	)

}

const _renderOptions = ( form, name, options, checkedValue, onClick ) => {

	return _.map( options, ( option, key ) => {

		let { label, value, color } = option
		let checked = checkedValue == value ? true : false

		return React.createElement( ICONRADIO, {

			key: key,
			form: form, 
			label: label,
			name: name,
			value: value,
			onClick: onClick,
			checked: checked,
			backgroundColor: color

		} )

	} )

}

iconradiogroup.propTypes = {

	hocProps: PropTypes.shape( {

		form: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,

		onClick: PropTypes.func,
		options: PropTypes.array.isRequired,
		className: PropTypes.string,
		defaultChecked: PropTypes.bool,

		checkedValue: PropTypes.string

	} )

}

export default hoc( iconradiogroup )

/*class iconradiogroup extends Component {

	static propTypes = {

		hocProps: PropTypes.shape( {

			jazz: PropTypes.bool,
			form: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,

			onClick: PropTypes.func,
			options: PropTypes.array.isRequired,
			className: PropTypes.string,
			defaultChecked: PropTypes.bool,

			checkedValue: PropTypes.string

		} )

	}

	constructor ( props ) {

		super ( props )

		this.state = {

			checkedValue: this.props.hocProps.checkedValue

		}

	}

	render () {

		console.log( "iconradiogroup: ", this.state.checkedValue )

		const { form, name, options, className } = this.props.hocProps

		const radios = this._renderOptions( form, name, options )

		return(

			<DIV className={ className } >
				{ radios }
			</DIV>

		)

	}

	_onClick = ( value ) => {

		let { onClick } = this.props.hocProps
		this.setState( { checkedValue: value } )
		onClick( value )

	}

	_renderOptions = ( form, name, options ) => {

		let { jazz, checkedValue } = this.props.hocProps

		return _.map( options, ( option, key ) => {

			let { label, value, color } = option
			let checked = checkedValue == value ? true : false

			return React.createElement( ICONRADIO, {

				key: key,
				jazz: jazz,
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
	
}*/
