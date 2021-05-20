import { combineReducers } from 'redux'
import {
	UPLOADER_START_UPLOAD,
	UPLOADER_SET_ERROR,
	UPLOADER_SET_SUCCESS,
	UPLOADER_CLEAR_ERROR,
} from 'src/constants/actionTypes'
import hashCode from 'src/utils/hashCode'

const current = (state = null, { type, payload }) => {
	const id = payload && hashCode(`${payload.hex}${payload.runtimeId}`)
	switch (type) {
		case UPLOADER_START_UPLOAD:
			return id
		case UPLOADER_SET_ERROR:
		case UPLOADER_SET_SUCCESS:
			return null
		default:
			return state
	}
}

const lastError = (state = null, { type, payload }) => {
	switch (type) {
		case UPLOADER_START_UPLOAD:
		case UPLOADER_CLEAR_ERROR:
		case UPLOADER_SET_SUCCESS:
			return null
		case UPLOADER_SET_ERROR:
			return payload.error
		default:
			return state
	}
}

const entities = (state = {}, { type, payload }) => {
	const id = payload ? hashCode(`${payload.hex}${payload.runtimeId}`) : '?'
	switch (type) {
		case UPLOADER_START_UPLOAD:
			return {
				...state,
				[id] : {
					success : null,
					error   : null,
				},
			}
		case UPLOADER_SET_ERROR:
			return {
				...state,
				[id] : {
					success : false,
					error   : payload.error,
				},
			}
		case UPLOADER_SET_SUCCESS:
			return {
				...state,
				[id] : {
					success : true,
					error   : null,
				},
			}
		default:
			return state
	}
}

export default combineReducers({
	current,
	lastError,
	entities,
})
