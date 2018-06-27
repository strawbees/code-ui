import generateAction from 'src/utils/generateAction'
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
import { setup as setupFlow } from 'src/editors/flow/actions'

export const setup = () => async (dispatch) => {
	dispatch(setupFlow())
}
export const setFlowName = generateAction(EDITOR_SET_FLOW_NAME)
export const setFlowId = generateAction(EDITOR_SET_FLOW_ID)
export const setFlowSource = generateAction(EDITOR_SET_FLOW_SOURCE)
export const setFlowGeneratedCode = generateAction(EDITOR_SET_FLOW_GENERATED_CODE)
export const setFlowProgram = ({ id, name, source }) => (dispatch) => {
	dispatch(setFlowId(id))
	dispatch(setFlowName(name))
	dispatch(setFlowSource(source))
}

export const setBlockName = generateAction(EDITOR_SET_SCRATCH_NAME)
export const setBlockId = generateAction(EDITOR_SET_SCRATCH_ID)
export const setBlockSource = generateAction(EDITOR_SET_SCRATCH_SOURCE)
export const setBlockGeneratedCode = generateAction(EDITOR_SET_SCRATCH_GENERATED_CODE)
export const setBlockProgram = ({ id, name, source }) => (dispatch) => {
	dispatch(setBlockId(id))
	dispatch(setBlockName(name))
	dispatch(setBlockSource(source))
}

export const setTextName = generateAction(EDITOR_SET_TEXT_NAME)
export const setTextId = generateAction(EDITOR_SET_TEXT_ID)
export const setTextSource = generateAction(EDITOR_SET_TEXT_SOURCE)
export const setTextGeneratedCode = generateAction(EDITOR_SET_TEXT_GENERATED_CODE)
export const setTextProgram = ({ id, name, source }) => (dispatch) => {
	dispatch(setTextId(id))
	dispatch(setTextName(name))
	dispatch(setTextSource(source))
}
