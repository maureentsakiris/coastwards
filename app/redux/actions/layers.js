import * as types from 'types'

export function setLayerVisibility ( layer, to ){

	return {

		type: types.SET_LAYER_VISIBILITY,
		layer: layer,
		to: to

	}

}