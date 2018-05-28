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
	UPDATE_INSTANCE_POSITION,
	UPDATE_INSTANCE_ID,
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
			if (state.indexOf(payload) !== -1) {
				return state
			}
			newState.push(payload)
			return newState
		}
		case REMOVE_INSTANCE: {
			const newState = [...state]
			const id = payload
			// find the instance
			let instanceIndex = -1
			for (let i = 0; i < newState.length; i++) {
				if (newState[i].id === id) {
					instanceIndex = i
					break
				}
			}
			if (instanceIndex === -1 || instanceIndex >= newState.length) {
				return state
			}
			// remove the instance
			newState.splice(instanceIndex, 1)
			console.warn('TODO: disconnect inputs')
			return newState
		}
		case UPDATE_INSTANCE_POSITION: {
			const newState = [...state]
			const { id, x, y } = payload
			// find the instance
			let instanceIndex = -1
			for (let i = 0; i < newState.length; i++) {
				if (newState[i].id === id) {
					instanceIndex = i
					break
				}
			}
			if (instanceIndex === -1 || instanceIndex >= newState.length) {
				return state
			}
			// copy and update it
			newState[instanceIndex] = {
				...newState[instanceIndex],
				x,
				y
			}
			return newState
		}
		case UPDATE_INSTANCE_ID: {
			const newState = [...state]
			const { id, newId } = payload
			// find the instance
			let instanceIndex = -1
			for (let i = 0; i < newState.length; i++) {
				if (newState[i].id === id) {
					instanceIndex = i
					break
				}
			}
			if (instanceIndex === -1 || instanceIndex >= newState.length) {
				return state
			}
			// copy and update it
			newState[instanceIndex] = {
				...newState[instanceIndex],
				id : newId
			}
			console.warn('TODO: update inputs inputs')
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
