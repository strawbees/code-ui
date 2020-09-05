import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'

import {
	SET_INTERNAL_DATA,
	SET_EXTERNAL_DATA,
} from './actionTypes'

const internalData = generateReducer(SET_INTERNAL_DATA, [])
const externalData = generateReducer(SET_EXTERNAL_DATA, [])

/* const externalData = (state = {}, { type, payload }) => {
	if (type === SET_INTERNAL_DATA) {
		const newState = { ...state }
		return newState
	}
	switch (type) {
		case SET_EXTERNAL_DATA: {
			return typeof payload === 'undefined' ? {} : payload
		}
		default:
			return state
	}
} */

export default combineReducers({
	internalData,
	externalData,
})
