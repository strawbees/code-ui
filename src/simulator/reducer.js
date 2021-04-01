import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'

import {
	SET_INTERNAL_DATA,
	SET_EXTERNAL_DATA,
	SET_EXTERNAL_NODE_DATA,
	SHOW_SIMULATOR,
	HIDE_SIMULATOR
} from './actionTypes'

const defaultInternalDataState = {
	id     : null,
	frames : 0,
	time   : 0,
	nodes  : {
		ids      : [],
		entities : {}
	}
}
const defaultExternalDataState = {
	nodes : {}
}
const internalData = generateReducer(SET_INTERNAL_DATA, defaultInternalDataState)
const externalData = (state = defaultExternalDataState, { type, payload }) => {
	if (type === SET_INTERNAL_DATA) {
		const nodes = { ...state.nodes }
		let needsSync = false
		// Sync the nodes with the internaldata, so we don't have node info on
		// the external data, if these node's don't exist in the internal data.
		// Also make sure to create containers for the nodes that apear
		// internally, but are not set externally.
		Object.keys(nodes).forEach((id) => {
			if (typeof payload.nodes.entities[id] === 'undefined') {
				delete nodes[id]
				needsSync = true
			}
		})
		payload.nodes.ids.forEach((id) => {
			if (typeof nodes[id] === 'undefined') {
				nodes[id] = null
				needsSync = true
			}
		})
		if (needsSync) {
			return {
				...state,
				nodes
			}
		}
		return state
	}

	switch (type) {
		case SET_EXTERNAL_DATA: {
			return {
				...payload
			}
		}
		case SET_EXTERNAL_NODE_DATA: {
			const { id, data } = payload
			const nodes = { ...state.nodes }
			nodes[id] = { ...data }
			return {
				...state,
				nodes
			}
		}
		default:
			return state
	}
}
const isSimulatorVisible = (state = false, { type }) => {
	switch (type) {
		case SHOW_SIMULATOR: {
			return true
		}
		case HIDE_SIMULATOR: {
			return false
		}
		default:
			return state
	}
}

export default combineReducers({
	internalData,
	externalData,
	isSimulatorVisible,
})
