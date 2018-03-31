import {
	SETUP_SET_QUERY,
	SETUP_SET_AS_PATH,
	SETUP_SET_URL_VARS,
	SETUP_SET_LOCALES,
	SETUP_SET_ROUTES,
	SETUP_SET_STRINGS,
	SETUP_SET_LOCAL_STORAGE
} from 'src/constants/actionTypes'

const query = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_QUERY:
			return {
				...payload
			}
		default:
			return state
	}
}
const asPath = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_AS_PATH:
			return payload
		default:
			return state
	}
}
const urlVars = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_URL_VARS:
			return {
				...payload
			}
		default:
			return state
	}
}
const locales = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_LOCALES:
			return [
				...payload
			]
		default:
			return state
	}
}
const routes = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_ROUTES:
			return {
				...payload
			}
		default:
			return state
	}
}
const strings = (state = {}, { type, payload }) => {
	const newState = {
		...state
	}
	switch (type) {
		case SETUP_SET_STRINGS:
			newState[payload.locale] = payload.data
			return newState
		default:
			return state
	}
}
const localStorage = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_LOCAL_STORAGE:
			return payload
		default:
			return state
	}
}

export default {
	query,
	asPath,
	urlVars,
	locales,
	routes,
	strings,
	localStorage
}
