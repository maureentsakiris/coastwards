import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Classnames from 'classnames'
import { map, first } from 'underscore'

import Feature from 'containers/admin/feature'

import DIV from 'components/tags/div'

import ICONCHECKBOX from 'components/form/input/iconcheckbox'
import GO from 'components/form/button/go'

import style from './_featurelist'

export default class Featurelist extends Component {

	static propTypes = {

		className: PropTypes.string,
		fetch: PropTypes.func,
		results: PropTypes.array

	}

	componentWillReceiveProps () {

		this.setState( { 

			offset: 10

		} )

	}

	constructor ( props ) {

		super ( props )

		this.state = {

			material: true,
			verified: true,
			closeup: true,
			example: true,
			intro: true,
			reported: true,
			offset: 10

		}

	}

	render () {

		const { results, className } = this.props
		const { material, verified, closeup, example, intro, reported, offset } = this.state

		const clsList = Classnames( style.featureList, className )

		if( results && results.length ){

			const truncated = first( results, offset )

			const hasMore = results.length > offset

			const featureList = map( truncated, ( result ) => {

				return (

					<DIV key={ result.properties.id }>
						<Feature properties={ result.properties } tabs={ this.state } />
					</DIV>

				)

			} )

			return(

				<DIV className={ clsList } >
					<DIV className={ style.tab } >
						<ICONCHECKBOX inline={ true } form="Listoptions" name="verified" label="Verified" value="verified" onChange={ this._setTabs } selected={ verified } />
						<ICONCHECKBOX inline={ true } form="Listoptions" name="material" label="Material" value="material" onChange={ this._setTabs } selected={ material } />
						<ICONCHECKBOX inline={ true } form="Listoptions" name="closeup" label="Closeup" value="closeup" onChange={ this._setTabs } selected={ closeup } />
						<ICONCHECKBOX inline={ true } form="Listoptions" name="reported" label="Reported" value="reported" onChange={ this._setTabs } selected={ reported } />
						<ICONCHECKBOX inline={ true } form="Listoptions" name="example" label="Example" value="example" onChange={ this._setTabs } selected={ example } />
						<ICONCHECKBOX inline={ true } form="Listoptions" name="intro" label="Intro" value="intro" onChange={ this._setTabs } selected={ intro } />
					</DIV>
					<DIV className={ style.listContainer } >
						{ featureList }
						{ hasMore && <GO className={ style.loadMore } onClick={ this._setOffset } label="Load more" /> }
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

	_setOffset = ( ) => {

		const currentOffset = this.state.offset

		this.setState( { offset: currentOffset + 10 } )

	}

}