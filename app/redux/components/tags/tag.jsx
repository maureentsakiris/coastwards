import React, { PropTypes, Component } from 'react';


const tag = ( ComposedComponent ) => class extends Component {

	static displayName = 'tagHOC'

	static propTypes = {

		mount: PropTypes.bool,
		children: PropTypes.node,

		accesskey: PropTypes.string,
		className: PropTypes.string,
		contenteditable: PropTypes.bool,
		contextmenu: PropTypes.string,
		dir: PropTypes.string,
		draggable: PropTypes.bool,
		dropzone: PropTypes.oneOf( [ 'copy', 'move', 'link' ] ),
		hidden: PropTypes.bool,
		id: PropTypes.string,
		lang: PropTypes.string,
		spellcheck: PropTypes.string,
		style: PropTypes.object,
		tabindex: PropTypes.number,
		title: PropTypes.string,
		translate: PropTypes.oneOf( [ 'yes', 'no' ] ),

		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onContextmenu: PropTypes.func,
		onFocus: PropTypes.func,
		onInput: PropTypes.func,
		onInvalid: PropTypes.func,
		onReset: PropTypes.func,
		onSearch: PropTypes.func,
		onSelect: PropTypes.func,
		onSubmit: PropTypes.func

	}

	static defaultProps = {

		mount: true

	}

	constructor ( props ) {

		super ( props )

	}

	render () {

		const { mount, ...props } = this.props

		if( !mount ){ 

			return null 

		}

		return(

			<ComposedComponent hocProps={ props } />

		)

	}

}

export default tag
