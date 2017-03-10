import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl'
import Classnames from 'classnames'
import _ from 'underscore'


import FORMDATA from 'containers/main/formdata'

import H from 'components/tags/h'
import IMG from 'components/tags/img'
import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import A from 'components/tags/a'

import RADIOGROUP from 'components/form/radiogroup/radiogroup'
import ICONRADIOGROUP from 'components/form/radiogroup/iconradiogroup'
import COMMENT from 'components/form/input/comment'
/*import HASHTAG from 'components/form/input/hashtag'*/
import CANCEL from 'components/form/button/cancel'
import GO from 'components/form/button/go'

import BR from 'components/tags/br'
import SMALL from 'components/tags/small'

import style from './_form'


const messages = defineMessages( {

	img_alt: {
		id: "img_alt",
		description: "Alt - Alternative description of the uploaded image",
		defaultMessage: "Your image"
	},
	hurray:{
		id: "hurray",
		description: "Header - Informs user that his or her image has passed all the tests and is now ready for upload",
		defaultMessage: "Your image is ready for upload! Just one more question ..."
	},


	//materials
	select_material:{
		id: "select_material",
		description: "Header - Asks user to help even more by answering a few questions",
		defaultMessage: "How would you describe the coast material?"
	},
	define_material:{
		id: "define_material",
		description: "Anchor - ",
		defaultMessage: "(What do you mean by coast material?)"
	},

	//materials <--> popup.jsx
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
	notset:{
		id: "notset",
		description: "Material - Not set",
		defaultMessage: "undefined"
	},

	//comment

	comment:{
		id: "comment",
		description: "Label - ",
		defaultMessage: "Leave us a comment!"
	},
	comment_placeholder:{
		id: "comment_placeholder",
		description: "Placeholder - ",
		defaultMessage: "Tell us, how did this coast change in recent years...?"
	},

	hashtag:{
		id: "hashtag",
		description: "Label - ",
		defaultMessage: "Sign your image with a hashtag!"
	},
	hashtag_placeholder:{
		id: "hashtag_placeholder",
		description: "Placeholder - ",
		defaultMessage: "#iwashere"
	},

	//upload
	upload_image:{
		id: "upload_image",
		description: "Button label - Prompts the user to upload the image",
		defaultMessage: "UPLOAD"
	},
	cancel:{
		id: "cancel",
		description: "Button label - Cancel upload",
		defaultMessage: "CANCEL"
	},
	accept_terms:{
		id: "accept_terms",
		description: "Checkbox - ",
		defaultMessage: "I accept the {terms}"
	},
	terms:{
		id: "terms",
		description: "Checkbox - ",
		defaultMessage: "Terms"
	}

} )

const form = ( { intl, className, show, image, checkedValue, jazzSupported, materials, setMaterial, setComment/*, setHashtag*/, uploadImage, resetMain, showDialog, setSnackbarMessage } ) => {

	const { formatMessage } = intl

	const mats = _.chain( materials )
	.filter( ( material ) => {

		let { value } = material
		return value !== 'notset'

	} )
	.map( ( material ) => {

		let { value, color } = material
		if( value !== 'noset' ){

			return { label: formatMessage( messages[ value ] ), value: value, color: color }

		}

	} )
	.value()


	if( !jazzSupported ){

		const cls = Classnames( className, style.form, {

			[ style.show ]: show

		} )

		return(

			<FORM id="Form" action="#" className={ cls } >
				{ image.dataURL && <IMG src={ image.dataURL } alt={ formatMessage( messages.img_alt ) } /> }
				<H priority={ 2 }>{ formatMessage( messages.hurray ) }</H>
				<RADIOGROUP controlled={ false } form="Form" label={ formatMessage( messages.select_material ) } name="material" options={ mats } onChange={ setMaterial } preferPlaceholder={ false } >
					{ " " }<SMALL><A onClick={ showDialog.bind( this, 'DEFINEMATERIAL' ) }>{ formatMessage( messages.define_material ) }</A></SMALL>
				</RADIOGROUP>
				<BR/><BR/>
				<COMMENT className={ style.comment } form="Form" label={ formatMessage( messages.comment ) }  preferPlaceholder={ false } placeholder={ formatMessage( messages.comment_placeholder ) } name="comment" onChange={ setComment } />
				<BR/><BR/>
				<FORMDATA />
				<BR/><BR/>
				<span>
					<input id="Terms" type="checkbox" value="1" />
					<FormattedMessage
						id="accept_terms"
						values={ { 
							terms: <A id="TermsLabel" onClick={ showDialog.bind( this, 'TERMS' ) } >{  formatMessage( messages.terms ) }</A>
						} }
					/>
				</span>
				<BR/><BR/>
				<CANCEL className={ style.cancel } onClick={ resetMain } label={ formatMessage( messages.cancel ) } />
				<GO onClick={ _checkTerms } label={ formatMessage( messages.upload_image ) } />
				<BR/><BR/>
			</FORM>

		)

	}else{

		const cls = Classnames( className, style.formJazz, {

			[ style.showJazz ]: show

		} )

		/*<HASHTAG className={ style.hashtag } preferPlaceholder={ false } label={ formatMessage( messages.hashtag ) } placeholder={ formatMessage( messages.hashtag_placeholder ) } form="Form" name="hashtag" onChange={ setHashtag } />*/

		return(

			<FORM id="Form" action="#" className={ cls } >
				<DIV>
					<DIV id="Sheet" className={ style.sheet } >
						{ image.dataURL && <DIV className={ style.image } style={ { backgroundImage: 'url(' + image.dataURL + ')' } } ></DIV> }
						<DIV id="Content" className={ style.content } >
							<H priority={ 2 }>{ formatMessage( messages.hurray ) }</H>
							<ICONRADIOGROUP checkedValue={ checkedValue } form="Form" label={ formatMessage( messages.select_material ) } name="material" options={ mats } onClick={ setMaterial } preferPlaceholder={ false } className={ style.iconradiogroup } >
								{ " " }<SMALL><A onClick={ showDialog.bind( this, 'DEFINEMATERIAL' ) }>{ formatMessage( messages.define_material ) }</A></SMALL>
							</ICONRADIOGROUP>
							<COMMENT className={ style.comment } form="Form" label={ formatMessage( messages.comment ) }  preferPlaceholder={ false } placeholder={ formatMessage( messages.comment_placeholder ) } name="comment" onChange={ setComment } />
							<FORMDATA />
						</DIV>
					</DIV>
					<DIV className={ style.actions } >
						<span className={ style.terms } >
							<input id="Terms" type="checkbox" value="1" />
							<FormattedMessage
								id="accept_terms"
								values={ { 
									terms: <A id="TermsLabel" onClick={ showDialog.bind( this, 'TERMS' ) } >{  formatMessage( messages.terms ) }</A>
								} }
							/>
						</span>
						<span className={ style.action } >
							<CANCEL className={ style.cancel } onClick={ resetMain } label={ formatMessage( messages.cancel ) } />
							<GO onClick={ _checkTerms } label={ formatMessage( messages.upload_image ) } />
						</span>
					</DIV>
				</DIV>
			</FORM>

		)

	}

	function _checkTerms (){

		let checked = document.getElementById( 'Terms' ).checked

		if( checked ){

			uploadImage()

		}else{

			setSnackbarMessage( 'accept_terms_first' )

		}

	}
	
}


form.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,

	show: PropTypes.bool,
	image: PropTypes.object,
	checkedValue: PropTypes.string,
	jazzSupported: PropTypes.bool,
	materials: PropTypes.array,

	setMaterial: PropTypes.func,
	setComment: PropTypes.func,
	/*setHashtag: PropTypes.func,*/
	uploadImage: PropTypes.func,
	resetMain: PropTypes.func,
	showDialog: PropTypes.func,
	setSnackbarMessage: PropTypes.func

}

export default injectIntl( form )
