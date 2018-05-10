import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'
import {
	SET_NODE_DEFINITIONS,
	SET_CATEGORY_DEFINITIONS,
	SET_DISPLAY_ADVANCED_NODES,
	TOGGLE_FOLDED_CATEGORY,
	REGISTER_GET_DROP_AREA_RECT,
	SET_SOURCE,
	ADD_INSTANCE,
	REMOVE_INSTANCE,
} from './actionTypes'

const nodeDefinitions = generateReducer(SET_NODE_DEFINITIONS)
const categoryDefinitions = generateReducer(SET_CATEGORY_DEFINITIONS)
const displayAdvancedNodes = generateReducer(SET_DISPLAY_ADVANCED_NODES, false)
const getDropAreaRect = generateReducer(REGISTER_GET_DROP_AREA_RECT)
const foldedCategories = (state = [], { type, payload }) => {
	switch (type) {
		case TOGGLE_FOLDED_CATEGORY: {
			const newState = [...state]
			if (state.indexOf(payload) === -1) {
				newState.push(payload)
			} else {
				newState.splice(newState.indexOf(payload), 1)
			}
			return newState
		}
		default:
			return state
	}
}
const source = (state = [], { type, payload }) => {
	switch (type) {
		case SET_SOURCE: {
			return payload
		}
		case ADD_INSTANCE: {
			const newState = [...state]
			if (state.indexOf(payload) === -1) {
				newState.push(payload)
			}
			return newState
		}
		case REMOVE_INSTANCE: {
			const newState = [...state]
			if (state.indexOf(payload) !== -1) {
				newState.splice(newState.indexOf(payload), 1)
			}
			// TODO: disconnect inputs
			return newState
		}
		default:
			return state
	}
}

export default combineReducers({
	nodeDefinitions,
	categoryDefinitions,
	displayAdvancedNodes,
	getDropAreaRect,
	foldedCategories,
	source,
})
