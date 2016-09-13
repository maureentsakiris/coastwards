import React, { PropTypes, Component } from 'react';

import LABEL from 'components/tags/label'
import SPAN from 'components/tags/span'

const hoc = ( ComposedComponent ) => class extends Component {

	static displayName = 'formelementHOC'

	static propTypes = {

		form: PropTypes.string.isRequired,
		label: PropTypes.string,
		name: PropTypes.string.isRequired,
		className: PropTypes.string

	}

	constructor ( props ) {

		super ( props )

	}

	render () {

		const { form, label, name, className } = this.props

		return(

			<LABEL htmlFor={ name } form={ form } className={ className } >
				<SPAN>{ label }</SPAN>
				<ComposedComponent hocProps={ this.props } />
			</LABEL>

		)

	}

}

export default hoc
