import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'
import {
	SET_NODE_DEFINITIONS,
	SET_CATEGORY_DEFINITIONS,
	SET_DISPLAY_ADVANCED_NODES,
	TOGGLE_FOLDED_CATEGORY
} from './actionTypes'

const nodeDefinitions = generateReducer(SET_NODE_DEFINITIONS, null)
const categoryDefinitions = generateReducer(SET_CATEGORY_DEFINITIONS, null)
const displayAdvancedNodes = generateReducer(SET_DISPLAY_ADVANCED_NODES, false)
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

export default combineReducers({
	nodeDefinitions,
	categoryDefinitions,
	displayAdvancedNodes,
	foldedCategories
})
