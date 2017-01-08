import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
/*import Classnames from 'classnames'
import unescape from 'validator/lib/unescape'*/

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import I from 'components/tags/i'
import P from 'components/tags/p'

import style from './_popup'

const messages = defineMessages( {

	// materials <--> popup.jsx
	// DO NOT DELETE, DYNAMIC!
	sand:{
		id: "sand",
		description: "Material - Sand",
		defaultMessage: "Sand"
	},
	pebble:{
		id: "pebble",
		description: "Material - Pebble",
		defaultMessage: "Pebble"
	},
	rock:{
		id: "rock",
		description: "Material - Rock",
		defaultMessage: "Rock"
	},
	mud:{
		id: "mud",
		description: "Material - Mud",
		defaultMessage: "Mud"
	},
	manmade:{
		id: "manmade",
		description: "Material - Man-made",
		defaultMessage: "Man-made"
	},
	ice:{
		id: "ice",
		description: "Material - Ice",
		defaultMessage: "Ice"
	},
	notsure:{
		id: "notsure",
		description: "Material - Not sure",
		defaultMessage: "Not sure"
	},
	notdefined:{
		id: "notdefined",
		description: "Material",
		defaultMessage: "Not set yet"
	}


} )


class popup extends Component {

	static propTypes = {

		intl: intlShape.isRequired,

		feature: PropTypes.object,
		config: PropTypes.object,

		hidePopup: PropTypes.func,
		addSnackbarMessage: PropTypes.func

	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

		this.state = {

			active: 'image'

		}

	}

	render () {

		const { formatMessage } = this.props.intl
		const { feature, config, hidePopup } = this.props

		if( !feature.properties ){

			return (
				
				<DIV id="Popup" className={ style.popup } ></DIV>

			)

		}else{

			const material = feature.properties.material ? feature.properties.material : 'notdefined'
			const color = config[ material ]

			return(

				<DIV id="Popup" className={ style.popup } >
					<DIV className={ style.top } style={ { backgroundImage: 'url(' + feature.properties.image +')' } } />
					<DIV className={ style.actions }>
						<P className={ style.label } style={ { backgroundColor: color } } >{ formatMessage( messages[ material ] ) }</P>
						<A onClick={ hidePopup } className={ style.clear } >
							<I className="material-icons">clear</I>
						</A>
					</DIV>
				</DIV>

			)

		}

	}

	_oops = ( e ) => {

		const { addSnackbarMessage } = this.props;
		addSnackbarMessage( 'oops', e )

	}

}

export default injectIntl( popup )
