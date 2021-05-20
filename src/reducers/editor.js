import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'
import {
	EDITOR_SET_FLOW_NAME,
	EDITOR_SET_FLOW_ID,
	EDITOR_SET_FLOW_SOURCE,
	EDITOR_SET_SCRATCH_NAME,
	EDITOR_SET_SCRATCH_ID,
	EDITOR_SET_SCRATCH_SOURCE,
	EDITOR_SET_TEXT_NAME,
	EDITOR_SET_TEXT_ID,
	EDITOR_SET_TEXT_SOURCE,
} from 'src/constants/actionTypes'

export default combineReducers({
	flow : combineReducers({
		name   : generateReducer(EDITOR_SET_FLOW_NAME),
		id     : generateReducer(EDITOR_SET_FLOW_ID),
		source : generateReducer(EDITOR_SET_FLOW_SOURCE),
	}),
	block : combineReducers({
		name   : generateReducer(EDITOR_SET_SCRATCH_NAME),
		id     : generateReducer(EDITOR_SET_SCRATCH_ID),
		source : generateReducer(EDITOR_SET_SCRATCH_SOURCE),
	}),
	text : combineReducers({
		name   : generateReducer(EDITOR_SET_TEXT_NAME),
		id     : generateReducer(EDITOR_SET_TEXT_ID),
		source : generateReducer(EDITOR_SET_TEXT_SOURCE),
	}),
})
