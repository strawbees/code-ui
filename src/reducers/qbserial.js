import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'

import {
	QBSERIAL_SET_LINKS,
	QBSERIAL_SET_AVAILABLE,
	QBSERIAL_SET_ALLOWED,
	QBSERIAL_SET_ALLOWED_STATUS,
	QBSERIAL_SET_READY,
} from 'src/constants/actionTypes'

const links = (state = {}, { type, payload }) => {
	switch (type) {
		case QBSERIAL_SET_LINKS:
			return {
				...payload
			}
		default:
			return state
	}
}
const available = generateReducer(QBSERIAL_SET_AVAILABLE, false)
const allowed = generateReducer(QBSERIAL_SET_ALLOWED, false)
const allowedStatus = generateReducer(QBSERIAL_SET_ALLOWED_STATUS, [false, false])
const ready = generateReducer(QBSERIAL_SET_READY, false)

export default combineReducers({
	links,
	available,
	allowed,
	allowedStatus,
	ready,
})
