import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'
import {
	SET_NODE_DEFINITIONS,
	SET_CATEGORY_DEFINITIONS,
	SET_CONSTANT_DEFINITIONS,
	SET_DISPLAY_ADVANCED_NODES,
	TOGGLE_FOLDED_CATEGORY,
	REGISTER_GET_DROP_AREA_RECT,
	SET_SOURCE,
	ADD_INSTANCE,
	REMOVE_INSTANCE,
	UPDATE_INSTANCE_POSITION,
	UPDATE_INSTANCE_NAME,
	SET_INSTANCE_PARAMETER,
	ADD_INSTANCE_PARAMETER_ITEM,
	REMOVE_INSTANCE_PARAMETER_ITEM,
	HIGHLIGHT_INSTANCE_PARAMETER_DROP_AREA,
	SET_IS_DRAGGING_OUTLET,
} from './actionTypes'

const helperFindInstanceIndex = (state, id) => {
	for (let i = 0; i < state.length; i++) {
		if (state[i].id === id) {
			return i
		}
	}
	return -1
}

const nodeDefinitions = generateReducer(SET_NODE_DEFINITIONS)
const categoryDefinitions = generateReducer(SET_CATEGORY_DEFINITIONS)
const constantDefinitions = generateReducer(SET_CONSTANT_DEFINITIONS)
const displayAdvancedNodes = generateReducer(SET_DISPLAY_ADVANCED_NODES, false)
const getDropAreaRect = generateReducer(REGISTER_GET_DROP_AREA_RECT)
const highlightedInstanceParameter = generateReducer(HIGHLIGHT_INSTANCE_PARAMETER_DROP_AREA)
const isDraggingOutlet = generateReducer(SET_IS_DRAGGING_OUTLET, false)
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
			const instanceIndex = helperFindInstanceIndex(state, id)
			if (instanceIndex === -1) {
				return state
			}
			// remove the instance
			newState.splice(instanceIndex, 1)
			// find parameters that are connected to this instance
			newState.forEach((refInstance, refInstanceIndex) => {
				if (!refInstance.parameters) {
					return
				}
				// clone the instance
				refInstance.parameters = {
					...refInstance.parameters
				}
				refInstance = {
					...refInstance
				}
				let updated = false
				Object.keys(refInstance.parameters).forEach(parameterId => {
					const parameterValue = String(refInstance.parameters[parameterId])
					const parameterValueArray = parameterValue.split('.')
					if (parameterValueArray.length !== 2) {
						return
					}
					if (parameterValueArray[0] !== id) {
						return
					}
					// found! update the refInstance
					delete refInstance.parameters[parameterId]
					updated = true
				})
				if (updated) {
					newState[refInstanceIndex] = refInstance
				}
			})
			return newState
		}
		case UPDATE_INSTANCE_POSITION: {
			const newState = [...state]
			const { id } = payload
			let { x, y } = payload
			x = parseInt(x, 10)
			y = parseInt(y, 10)
			// find the instance
			const instanceIndex = helperFindInstanceIndex(state, id)
			if (instanceIndex === -1) {
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
		case UPDATE_INSTANCE_NAME: {
			const newState = [...state]
			const { id, name } = payload
			// find the instance
			const instanceIndex = helperFindInstanceIndex(state, id)
			if (instanceIndex === -1) {
				return state
			}
			// copy and update it
			newState[instanceIndex] = {
				...newState[instanceIndex],
				name
			}
			return newState
		}
		case SET_INSTANCE_PARAMETER: {
			const newState = [...state]
			const { id, parameterId, value } = payload
			// find the instance
			const instanceIndex = helperFindInstanceIndex(state, id)
			if (instanceIndex === -1) {
				return state
			}
			// manage the parameters map
			const parameters = {
				...(newState[instanceIndex].parameters || {})
			}
			// set the value
			parameters[parameterId] = value
			// copy and update it
			newState[instanceIndex] = {
				...newState[instanceIndex],
				parameters
			}
			return newState
		}
		case ADD_INSTANCE_PARAMETER_ITEM: {
			const newState = [...state]
			const { id, parameterId } = payload
			// find the instance
			const instanceIndex = helperFindInstanceIndex(state, id)
			if (instanceIndex === -1) {
				return state
			}
			// manage the parameters map
			const parameters = {
				...(newState[instanceIndex].parameters || {})
			}
			// find how many items are already there
			const numItems = Object.keys(parameters).reduce((acc, key) => {
				if (key.indexOf(`${parameterId}.`) === 0) {
					acc++
				}
				return acc
			}, 0)
			parameters[`${parameterId}.${numItems}`] = null
			// copy and update it
			newState[instanceIndex] = {
				...newState[instanceIndex],
				parameters
			}
			return newState
		}
		case REMOVE_INSTANCE_PARAMETER_ITEM: {
			const newState = [...state]
			const { id, parameterId, parameterIndex } = payload
			const parameterKey = `${parameterId}.${parameterIndex}`
			// find the instance
			const instanceIndex = helperFindInstanceIndex(state, id)
			if (instanceIndex === -1) {
				return state
			}
			// manage the parameters map
			const parameters = {
				...(newState[instanceIndex].parameters || {})
			}
			// check if parameters exists
			if (typeof parameters[parameterKey] === 'undefined') {
				return state
			}
			// update the index of the parameters that follow
			Object.keys(parameters)
				.filter(key => key.indexOf(`${parameterId}.`) === 0)
				.filter(key => parseInt(key.split('.')[1], 10) >= parameterIndex)
				.sort((a, b) => {
					const ai = parseInt(a.split('.')[1], 10)
					const bi = parseInt(b.split('.')[1], 10)
					return ai < bi ? -1 : 1
				})
				.forEach((key, i, arr) => {
					// shift the indexes up
					const keyParameterIndex = key.split('.')[1]
					if (keyParameterIndex > 0) {
						parameters[`${parameterId}.${keyParameterIndex - 1}`] = parameters[key]
					}
					if (i === arr.length - 1) {
						// remove last item
						delete parameters[key]
					}
				})
			// copy and update it
			newState[instanceIndex] = {
				...newState[instanceIndex],
				parameters
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
	constantDefinitions,
	displayAdvancedNodes,
	getDropAreaRect,
	foldedCategories,
	source,
	highlightedInstanceParameter,
	isDraggingOutlet,
})
