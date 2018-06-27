import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'
import {
	SETUP_SET_QUERY,
	SETUP_SET_AS_PATH,
	SETUP_SET_URL_VARS,
	SETUP_SET_LOCALES,
	SETUP_SET_ROUTES,
	SETUP_SET_STRINGS,
	SETUP_SET_DISPLAY_PAGE_LOADER,
	SETUP_SET_DISPLAY_ERROR,
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
const localesLoaded = (state = false, { type }) => {
	switch (type) {
		case SETUP_SET_LOCALES:
			return true
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
const routesLoaded = (state = false, { type }) => {
	switch (type) {
		case SETUP_SET_ROUTES:
			return true
		default:
			return state
	}
}
const strings = (state = {}, { type, payload }) => {
	switch (type) {
		case SETUP_SET_STRINGS: {
			const newState = {
				...state
			}
			newState[payload.locale] = payload.data
			return newState
		}
		default:
			return state
	}
}
const stringsLoaded = (state = {}, { type, payload }) => {
	switch (type) {
		case SETUP_SET_STRINGS: {
			const newState = {
				...state
			}
			newState[payload.locale] = true
			return newState
		}
		default:
			return state
	}
}

const displayPageLoader = generateReducer(SETUP_SET_DISPLAY_PAGE_LOADER, false)
const displayError = generateReducer(SETUP_SET_DISPLAY_ERROR, false)

export default combineReducers({
	query,
	asPath,
	urlVars,
	locales,
	localesLoaded,
	routes,
	routesLoaded,
	strings,
	stringsLoaded,
	displayPageLoader,
	displayError,
})
