import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { /*defineMessages,*/ injectIntl, intlShape } from 'react-intl'
/*import Classnames from 'classnames'
import unescape from 'validator/lib/unescape'*/

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import I from 'components/tags/i'
/*import P from 'components/tags/p'*/

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

			active: 'image'

		}

	}

	render () {

		const { feature, hidePopup } = this.props
		/*const { active } = this.state*/

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

			/*const hasComment = feature.properties.comment ? true : false

			const clsImageIcon = Classnames( style.icon, {

				[ style.active ]: active == 'image'

			} )

			const clsCommentIcon = Classnames( style.icon, {

				[ style.hide ]: !hasComment,
				[ style.active ]: active == 'comment'

			} )

			const clsComment = Classnames( style.comment, {

				[ style.show ]: active == 'comment' && hasComment

			} )

			const comment = hasComment ? unescape( feature.properties.comment ) : ''*/

			return(

				<DIV id="Popup" className={ style.popup } >
					<DIV className={ style.top } style={ { backgroundImage: 'url(' + feature.properties.image +')' } } />
					<DIV className={ style.actions }>
						<span>{ feature.properties.id }</span>
						<A onClick={ this._oops } className={ style.comment } >
							<I className="material-icons">mode_comment</I>
						</A>
						<A onClick={ this._oops } className={ style.send } >
							<I className="material-icons">send</I>
						</A>
						<A onClick={ this._oops } className={ style.favorite } >
							<I className="material-icons">favorite</I>
						</A>
						<A onClick={ hidePopup } className={ style.clear } >
							<I className="material-icons">clear</I>
						</A>
					</DIV>
				</DIV>

			)

		}

	}

	/*_setActive = ( comp, e ) => {

		e.preventDefault()
		this.setState( { active: comp } )

	}

	_hidePopup = ( e ) => {

		e.preventDefault()
		const { hidePopup } = this.props

		this._reset()
		hidePopup()

	}

	_reset = ( ) => {

		this.setState( { active: 'image' } )

	}*/

	_oops = ( e ) => {

		const { addSnackbarMessage } = this.props;
		addSnackbarMessage( 'oops', e )

	}

}

export default injectIntl( popup )
