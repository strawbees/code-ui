import { combineReducers } from 'redux'
import {
	STORAGE_SET_READY,
	STORAGE_SET_PROGRAMS,
	STORAGE_ADD_PROGRAM,
	STORAGE_UPDATE_PROGRAM,
	STORAGE_REMOVE_PROGRAM,
	STORAGE_REMOVE_ALL_PROGRAMS
} from 'src/constants/actionTypes'

const ready = (state = false, { type, payload }) => {
	switch (type) {
		case STORAGE_SET_READY: {
			return payload
		}
		default:
			return state
	}
}

const programs = (state = {}, { type, payload }) => {
	switch (type) {
		case STORAGE_SET_PROGRAMS:
			return {
				...payload.data
			}
		case STORAGE_ADD_PROGRAM:
		case STORAGE_UPDATE_PROGRAM: {
			return {
				...state,
				[payload.id] : payload.data
			}
		}
		case STORAGE_REMOVE_PROGRAM: {
			const newState = {
				...state
			}
			delete newState[payload.id]
			return newState
		}
		case STORAGE_REMOVE_ALL_PROGRAMS: {
			return {}
		}
		default:
			return state
	}
}

export default combineReducers({
	ready,
	programs
})
