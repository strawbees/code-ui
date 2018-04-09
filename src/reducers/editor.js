import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'
import {
	EDITOR_SET_FLOW_NAME,
	EDITOR_SET_FLOW_SAVED,
	EDITOR_SET_FLOW_SOURCE,
	EDITOR_SET_FLOW_GENERATED_CODE,
	EDITOR_SET_SCRATCH_NAME,
	EDITOR_SET_SCRATCH_SAVED,
	EDITOR_SET_SCRATCH_SOURCE,
	EDITOR_SET_SCRATCH_GENERATED_CODE,
	EDITOR_SET_TEXT_NAME,
	EDITOR_SET_TEXT_SAVED,
	EDITOR_SET_TEXT_SOURCE,
	EDITOR_SET_TEXT_GENERATED_CODE
} from 'src/constants/actionTypes'

export default combineReducers({
	flow : combineReducers({
		name          : generateReducer(EDITOR_SET_FLOW_NAME),
		saved         : generateReducer(EDITOR_SET_FLOW_SAVED),
		source        : generateReducer(EDITOR_SET_FLOW_SOURCE),
		// generatedCode : generateReducer(EDITOR_SET_FLOW_GENERATED_CODE)
	}),
	scratch : combineReducers({
		name          : generateReducer(EDITOR_SET_SCRATCH_NAME),
		saved         : generateReducer(EDITOR_SET_SCRATCH_SAVED),
		source        : generateReducer(EDITOR_SET_SCRATCH_SOURCE),
		// generatedCode : generateReducer(EDITOR_SET_SCRATCH_GENERATED_CODE)
	}),
	text : combineReducers({
		name          : generateReducer(EDITOR_SET_TEXT_NAME),
		saved         : generateReducer(EDITOR_SET_TEXT_SAVED),
		source        : generateReducer(EDITOR_SET_TEXT_SOURCE),
		// generatedCode : generateReducer(EDITOR_SET_TEXT_GENERATED_CODE)
	})
})
