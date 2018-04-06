import { combineReducers } from 'redux'
import {
	EDITOR_SET_FLOW_SOURCE,
	EDITOR_SET_FLOW_GENERATED_CODE,
	EDITOR_SET_SCRATCH_SOURCE,
	EDITOR_SET_SCRATCH_GENERATED_CODE,
	EDITOR_SET_TEXT_SOURCE,
	EDITOR_SET_TEXT_GENERATED_CODE
} from 'src/constants/actionTypes'

const generate = (targetType) => (state = null, { type, payload }) => {
	switch (type) {
		case targetType: {
			return payload
		}
		default:
			return state
	}
}

export default combineReducers({
	flow : combineReducers({
		source        : generate(EDITOR_SET_FLOW_SOURCE),
		generatedCode : generate(EDITOR_SET_FLOW_GENERATED_CODE)
	}),
	scratch : combineReducers({
		source        : generate(EDITOR_SET_SCRATCH_SOURCE),
		generatedCode : generate(EDITOR_SET_SCRATCH_GENERATED_CODE)
	}),
	text : combineReducers({
		source        : generate(EDITOR_SET_TEXT_SOURCE),
		generatedCode : generate(EDITOR_SET_TEXT_GENERATED_CODE)
	})
})
