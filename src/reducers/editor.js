import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'
import {
	EDITOR_SET_FLOW_NAME,
	EDITOR_SET_FLOW_ID,
	EDITOR_SET_FLOW_SOURCE,
	EDITOR_SET_FLOW_GENERATED_CODE,
	EDITOR_SET_SCRATCH_NAME,
	EDITOR_SET_SCRATCH_ID,
	EDITOR_SET_SCRATCH_SOURCE,
	EDITOR_SET_SCRATCH_GENERATED_CODE,
	EDITOR_SET_TEXT_NAME,
	EDITOR_SET_TEXT_ID,
	EDITOR_SET_TEXT_SOURCE,
	EDITOR_SET_TEXT_GENERATED_CODE
} from 'src/constants/actionTypes'

export default combineReducers({
	flow : combineReducers({
		name          : generateReducer(EDITOR_SET_FLOW_NAME),
		id            : generateReducer(EDITOR_SET_FLOW_ID),
		source        : generateReducer(EDITOR_SET_FLOW_SOURCE),
		// generatedCode : generateReducer(EDITOR_SET_FLOW_GENERATED_CODE)
	}),
	scratch : combineReducers({
		name          : generateReducer(EDITOR_SET_SCRATCH_NAME),
		id            : generateReducer(EDITOR_SET_SCRATCH_ID),
		source        : generateReducer(EDITOR_SET_SCRATCH_SOURCE),
		// generatedCode : generateReducer(EDITOR_SET_SCRATCH_GENERATED_CODE)
	}),
	text : combineReducers({
		name          : generateReducer(EDITOR_SET_TEXT_NAME),
		id            : generateReducer(EDITOR_SET_TEXT_ID),
		source        : generateReducer(EDITOR_SET_TEXT_SOURCE),
		// generatedCode : generateReducer(EDITOR_SET_TEXT_GENERATED_CODE)
	})
})
