import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'
import {
	QBMIDI_SET_LINKS,
	QBMIDI_SET_AVAILABLE,
	QBMIDI_SET_READY,
} from 'src/constants/actionTypes'

const links = (state = {}, { type, payload }) => {
	switch (type) {
		case QBMIDI_SET_LINKS:
			return {
				...payload,
			}
		default:
			return state
	}
}

const available = generateReducer(QBMIDI_SET_AVAILABLE, false)
const ready = generateReducer(QBMIDI_SET_READY, false)

export default combineReducers({
	links,
	available,
	ready,
})
