import * as types from 'types'
import { lockWindowScroll, unlockWindowScroll } from 'actions/util/misc'

export function showDialog ( component ){


	lockWindowScroll()
	return {

		type: types.SHOW_DIALOG,
		component: component

	}

}

export function hideDialog ( ){

	unlockWindowScroll()
	return {

		type: types.HIDE_DIALOG

	}

}