import { combineReducers } from 'redux'
import {
	SETUP_SET,
	SETUP_SET_ROOT_PATH,
	SETUP_SET_QUERY,
	SETUP_SET_AS_PATH,
	SETUP_SET_URL_VARS,
	SETUP_SET_LOCALES,
	SETUP_SET_ROUTES,
	SETUP_SET_STRINGS,
	SETUP_SET_CODING_CARDS,
	SETUP_SET_FACTORY_CODE,
	SETUP_SET_DISPLAY_PAGE_LOADER,
	SETUP_SET_DISPLAY_ERROR,
	SETUP_SET_OS,
} from 'src/constants/actionTypes'

const rootPath = (state = '', { type, payload }) => {
	switch (type) {
		case SETUP_SET_ROOT_PATH:
			return payload
		case SETUP_SET:
			if (typeof payload.rootPath !== 'undefined') {
				return payload.rootPath
			}
			return state
		default:
			return state
	}
}
const query = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_QUERY:
			return {
				...payload,
			}
		case SETUP_SET:
			if (typeof payload.query !== 'undefined') {
				return {
					...payload.query,
				}
			}
			return state
		default:
			return state
	}
}
const asPath = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_AS_PATH:
			return payload
		case SETUP_SET:
			if (typeof payload.asPath !== 'undefined') {
				return payload.asPath
			}
			return state
		default:
			return state
	}
}
const urlVars = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_URL_VARS:
			return {
				...payload,
			}
		case SETUP_SET:
			if (typeof payload.urlVars !== 'undefined') {
				return {
					...payload.urlVars,
				}
			}
			return state
		default:
			return state
	}
}
const locales = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_LOCALES:
			return [
				...payload,
			]
		case SETUP_SET:
			if (typeof payload.locales !== 'undefined') {
				return [
					...payload.locales,
				]
			}
			return state
		default:
			return state
	}
}
const routes = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_ROUTES:
			return {
				...payload,
			}
		case SETUP_SET:
			if (typeof payload.routes !== 'undefined') {
				return {
					...payload.routes,
				}
			}
			return state
		default:
			return state
	}
}
const strings = (state = {}, { type, payload }) => {
	switch (type) {
		case SETUP_SET_STRINGS: {
			const newState = {
				...state,
			}
			newState[payload.locale] = payload.data
			return newState
		}
		case SETUP_SET: {
			if (typeof payload.strings !== 'undefined') {
				const newState = {
					...state,
				}
				newState[payload.strings.locale] = payload.strings.data
				return newState
			}
			return state
		}
		default:
			return state
	}
}
const stringsLoaded = (state = {}, { type, payload }) => {
	switch (type) {
		case SETUP_SET_STRINGS: {
			const newState = {
				...state,
			}
			newState[payload.locale] = true
			return newState
		}
		case SETUP_SET: {
			if (typeof payload.strings !== 'undefined') {
				const newState = {
					...state,
				}
				newState[payload.strings.locale] = true
				return newState
			}
			return state
		}
		default:
			return state
	}
}
const factoryCode = (state = '', { type, payload }) => {
	switch (type) {
		case SETUP_SET_FACTORY_CODE:
			return payload
		case SETUP_SET:
			if (typeof payload.factoryCode !== 'undefined') {
				return payload.factoryCode
			}
			return state
		default:
			return state
	}
}
const codingCards = (state = {}, { type, payload }) => {
	switch (type) {
		case SETUP_SET_CODING_CARDS:
			return payload
		case SETUP_SET:
			if (typeof payload.codingCards !== 'undefined') {
				return payload.codingCards
			}
			return state
		default:
			return state
	}
}
const displayPageLoader = (state = false, { type, payload }) => {
	switch (type) {
		case SETUP_SET_DISPLAY_PAGE_LOADER:
			return payload
		case SETUP_SET:
			if (typeof payload.displayPageLoader !== 'undefined') {
				return payload.displayPageLoader
			}
			return state
		default:
			return state
	}
}
const displayError = (state = false, { type, payload }) => {
	switch (type) {
		case SETUP_SET_DISPLAY_ERROR:
			return payload
		case SETUP_SET:
			if (typeof payload.displayError !== 'undefined') {
				return payload.displayError
			}
			return state
		default:
			return state
	}
}
const os = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_OS:
			return payload
		case SETUP_SET:
			if (typeof payload.os !== 'undefined') {
				return payload.os
			}
			return state
		default:
			return state
	}
}

export default combineReducers({
	rootPath,
	query,
	asPath,
	urlVars,
	locales,
	routes,
	strings,
	stringsLoaded,
	factoryCode,
	codingCards,
	displayPageLoader,
	displayError,
	os,
})
