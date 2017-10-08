import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Classnames from 'classnames'
import { map } from 'underscore'
import Feature from 'containers/admin/feature'
import ICONCHECKBOX from 'components/form/input/iconcheckbox'

import DIV from 'components/tags/div'

import style from './_featurelist'

export default class Featurelist extends Component {

	static propTypes = {

		className: PropTypes.string,
		fetch: PropTypes.func,
		results: PropTypes.array

	}

	constructor ( props ) {

		super ( props )

		this.state = {

			material: true,
			verified: true,
			closeup: false,
			example: false,
			intro: false,
			comment: false


		}

	}

	render () {

		const { results, className } = this.props
		const { material, verified, closeup, example, intro, comment } = this.state

		const clsList = Classnames( style.featureList, className )


		/*const tabs = chain( this.state )
			.pick( ( value ) => {

				return value

			} )
			.keys().value()*/

		if( results && results.length ){


			const featureList = map( results, ( result ) => {

				return (

					<DIV className={ style.listItem } key={ result.properties.id }>
						<Feature properties={ result.properties } tabs={ this.state } />
					</DIV>

				)

			} )

			return(

				<DIV className={ clsList } >
					<DIV className={ style.tab } >
						<ICONCHECKBOX inline={ true } form="Listoptions" name="material" label="Material" value="material" onChange={ this._setTabs } selected={ material } />
						<ICONCHECKBOX inline={ true } form="Listoptions" name="verified" label="Verified" value="verified" onChange={ this._setTabs } selected={ verified } />
						<ICONCHECKBOX inline={ true } form="Listoptions" name="closeup" label="Closeup" value="closeup" onChange={ this._setTabs } selected={ closeup } />
						<ICONCHECKBOX inline={ true } form="Listoptions" name="example" label="Example" value="example" onChange={ this._setTabs } selected={ example } />
						<ICONCHECKBOX inline={ true } form="Listoptions" name="intro" label="Intro" value="intro" onChange={ this._setTabs } selected={ intro } />
						<ICONCHECKBOX inline={ true } form="Listoptions" name="comment" label="Comment" value="comment" onChange={ this._setTabs } selected={ comment } />
					</DIV>
					<DIV className={ style.listContainer } >
						{ featureList }
					</DIV>
				</DIV>

			)


		}else{

			return(

				<DIV className={ clsList } >
					<DIV className={ style.listContainer } >
						No results
					</DIV>
				</DIV>

			)

		}

	}

	_setTabs = ( selected, value ) => {

		this.setState( { [ value ]: !selected } )

	}

}