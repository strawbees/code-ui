import { combineReducers } from 'redux'
import {
	STORAGE_SET_STATUS,
	STORAGE_SET_CREDENTIALS,
	STORAGE_SET_USER,
	STORAGE_SET_PROGRAMS,
	STORAGE_ADD_PROGRAM,
	STORAGE_UPDATE_PROGRAM,
	STORAGE_REMOVE_PROGRAM,
	STORAGE_REMOVE_ALL_PROGRAMS,
	STORAGE_SET_REMOTE_MIRROR,
	STORAGE_SET_PUBLIC_PROFILE,
	STORAGE_CLEAR
} from 'src/constants/actionTypes'


const status = (state = null, { type, payload }) => {
	switch (type) {
		case STORAGE_SET_STATUS:
			return typeof payload === 'undefined' ? null : payload
		case STORAGE_CLEAR:
			return null
		default:
			return state
	}
}
const credentials = (state = null, { type, payload }) => {
	switch (type) {
		case STORAGE_SET_CREDENTIALS:
			return typeof payload === 'undefined' ? null : payload
		case STORAGE_CLEAR:
			return null
		default:
			return state
	}
}
const user = (state = null, { type, payload }) => {
	switch (type) {
		case STORAGE_SET_USER:
			return typeof payload === 'undefined' ? null : payload
		case STORAGE_CLEAR:
			return null
		default:
			return state
	}
}
const defaultRemoteMirror = { programs : {}, user : null }
const remoteMirror = (state = defaultRemoteMirror, { type, payload }) => {
	switch (type) {
		case STORAGE_SET_REMOTE_MIRROR:
			return !payload ? defaultRemoteMirror : payload
		case STORAGE_CLEAR:
			return defaultRemoteMirror
		default:
			return state
	}
}
const defaultPrograms = {}
const programs = (state = defaultPrograms, { type, payload }) => {
	switch (type) {
		case STORAGE_SET_PROGRAMS:
			return {
				...payload
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
		case STORAGE_REMOVE_ALL_PROGRAMS:
		case STORAGE_CLEAR: {
			return defaultPrograms
		}
		default:
			return state
	}
}

const defaultPublicProfile = { programs : {}, user : null }
const publicProfile = (state = defaultPublicProfile, { type, payload }) => {
	switch (type) {
		case STORAGE_SET_PUBLIC_PROFILE:
			return !payload ? defaultPublicProfile : payload
		case STORAGE_CLEAR:
			return defaultPublicProfile
		default:
			return state
	}
}

export default combineReducers({
	status,
	credentials,
	user,
	remoteMirror,
	programs,
	publicProfile,
})
