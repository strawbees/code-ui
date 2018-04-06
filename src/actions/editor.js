import generateAction from 'src/utils/generateAction'
import {
	EDITOR_SET_FLOW_SOURCE,
	EDITOR_SET_FLOW_GENERATED_CODE,
	EDITOR_SET_SCRATCH_SOURCE,
	EDITOR_SET_SCRATCH_GENERATED_CODE,
	EDITOR_SET_TEXT_SOURCE,
	EDITOR_SET_TEXT_GENERATED_CODE
} from 'src/constants/actionTypes'

export const setFlowSource = generateAction(EDITOR_SET_FLOW_SOURCE)
export const setFlowGeneratedCode = generateAction(EDITOR_SET_FLOW_GENERATED_CODE)
export const setScratchSource = generateAction(EDITOR_SET_SCRATCH_SOURCE)
export const setScratchGeneratedCode = generateAction(EDITOR_SET_SCRATCH_GENERATED_CODE)
export const setTextSource = generateAction(EDITOR_SET_TEXT_SOURCE)
export const setTextGeneratedCode = generateAction(EDITOR_SET_TEXT_GENERATED_CODE)
