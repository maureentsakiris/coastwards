import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { /*defineMessages,*/ injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import I from 'components/tags/i'
import P from 'components/tags/p'

import style from './_popup'

/*const messages = defineMessages( {


} )*/


class popup extends Component {

	static propTypes = {

		intl: intlShape.isRequired,

		feature: PropTypes.object,

		hidePopup: PropTypes.func,
		addSnackbarMessage: PropTypes.func

	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

		this.state = {

			comment: false

		}

	}

	render () {

		const { feature } = this.props
		const { comment } = this.state

		if( !feature.properties ){

			return (
				
				<DIV id="Popup" className={ style.popup } ></DIV>

			)

		}else{

			/*<A onClick={ _oops } className={ style.send } >
							<I className="material-icons">send</I>
						</A>
						<A onClick={ _oops } className={ style.favorite } >
							<I className="material-icons">favorite</I>
						</A>*/

			const hasComment = feature.properties.comment !== "" ? true : false

			const clsCommentIcon = Classnames( style.commentIcon, {

				[ style.disabled ]: !hasComment,
				[ style.active ]: comment

			} )

			const clsComment = Classnames( style.comment, {

				[ style.show ]: comment && hasComment

			} )

			return(

				<DIV id="Popup" className={ style.popup } >
					<DIV className={ style.image } style={ { backgroundImage: 'url(' + feature.properties.image +')' } } />
					<DIV className={ style.actions }>
						<A onClick={ this._toggleComment } className={ clsCommentIcon } >
							<I className="material-icons">mode_comment</I>
						</A>
						<A onClick={ this._hidePopup } className={ style.clear } >
							<I className="material-icons">clear</I>
						</A>
						<P className={ clsComment }>{ feature.properties.comment }</P>
					</DIV>
				</DIV>

			)

		}

	}

	_toggleComment = ( e ) => {

		e.preventDefault()
		const { comment } = this.state
		this.setState( { comment: !comment } )

	}

	_hidePopup = ( e ) => {

		e.preventDefault()
		const { hidePopup } = this.props

		this._reset()
		hidePopup()

	}

	_reset = ( ) => {

		this.setState( { comment: false } )

	}

	_oops = ( e ) => {

		const { addSnackbarMessage } = this.props;
		addSnackbarMessage( 'oops', e )

	}

}

export default injectIntl( popup )
