import { combineReducers } from 'redux'
import {
	STORAGE_ADD_PROGRAM,
	STORAGE_UPDATE_PROGRAM,
	STORAGE_REMOVE_PROGRAM,
	STORAGE_REMOVE_ALL_PROGRAMS
} from 'src/constants/actionTypes'

const genericProgramReducer = (state = {}, { type, payload : { id, data } }) => {
	switch (type) {
		case STORAGE_ADD_PROGRAM:
		case STORAGE_UPDATE_PROGRAM: {
			return {
				...state,
				[id] : data
			}
		}
		case STORAGE_REMOVE_PROGRAM: {
			const newState = {
				...state
			}
			delete newState[id]
			return newState
		}
		case STORAGE_REMOVE_ALL_PROGRAMS: {
			return {}
		}
		default:
			return state
	}
}
const flow = (state = {}, { payload = {} }) => {
	if (payload.mode !== 'flow') {
		return state
	}
	return genericProgramReducer(state, payload)
}
const scratch = (state = {}, { payload = {} }) => {
	if (payload.mode !== 'scratch') {
		return state
	}
	return genericProgramReducer(state, payload)
}
const text = (state = {}, { payload = {} }) => {
	if (payload.mode !== 'text') {
		return state
	}
	return genericProgramReducer(state, payload)
}

export default combineReducers({
	flow,
	scratch,
	text
})
