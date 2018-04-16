import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'
import {
	MODAL_SHOW_MODAL,
	MODAL_HIDE_MODAL,
	MODAL_SET_CONTENT,
	MODAL_SET_ON_REQUEST_CLOSE,
} from 'src/constants/actionTypes'

const display = (state = false, { type }) => {
	switch (type) {
		case MODAL_SHOW_MODAL:
			return true
		case MODAL_HIDE_MODAL:
			return false
		default:
			return state
	}
}

const content = generateReducer(MODAL_SET_CONTENT)
const onRequestClose = generateReducer(MODAL_SET_ON_REQUEST_CLOSE)

export default combineReducers({
	display,
	content,
	onRequestClose
})
