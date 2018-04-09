import generateAction from 'src/utils/generateAction'
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

export const setFlowName = generateAction(EDITOR_SET_FLOW_NAME)
export const setFlowSaved = generateAction(EDITOR_SET_FLOW_SAVED)
export const setFlowSource = generateAction(EDITOR_SET_FLOW_SOURCE)
export const setFlowGeneratedCode = generateAction(EDITOR_SET_FLOW_GENERATED_CODE)

export const setScratchName = generateAction(EDITOR_SET_SCRATCH_NAME)
export const setScratchSaved = generateAction(EDITOR_SET_SCRATCH_SAVED)
export const setScratchSource = generateAction(EDITOR_SET_SCRATCH_SOURCE)
export const setScratchGeneratedCode = generateAction(EDITOR_SET_SCRATCH_GENERATED_CODE)

export const setTextName = generateAction(EDITOR_SET_TEXT_NAME)
export const setTextSaved = generateAction(EDITOR_SET_TEXT_SAVED)
export const setTextSource = generateAction(EDITOR_SET_TEXT_SOURCE)
export const setTextGeneratedCode = generateAction(EDITOR_SET_TEXT_GENERATED_CODE)
