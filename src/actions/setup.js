import {
	SETUP_SET_QUERY,
	SETUP_SET_AS_PATH,
	SETUP_SET_URL_VARS,
	SETUP_SET_LOCALES,
	SETUP_SET_ROUTES,
	SETUP_SET_STRINGS,
	SETUP_SET_LOCAL_STORAGE
} from 'src/constants/actionTypes'

export const setQuery = payload => ({
	type : SETUP_SET_QUERY,
	payload
})
export const setAsPath = payload => ({
	type : SETUP_SET_AS_PATH,
	payload
})
export const setUrlVars = payload => ({
	type : SETUP_SET_URL_VARS,
	payload
})
export const setLocales = payload => ({
	type : SETUP_SET_LOCALES,
	payload
})
export const setRoutes = payload => ({
	type : SETUP_SET_ROUTES,
	payload
})
export const setStrings = payload => ({
	type : SETUP_SET_STRINGS,
	payload
})
export const setLocalStorage = payload => ({
	type : SETUP_SET_LOCAL_STORAGE,
	payload
})
