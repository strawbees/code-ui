import Router from 'next/router'
import generateAction from 'src/utils/generateAction'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import storageProgramSelector from 'src/selectors/storageProgramSelector'
import urlVarsSelector from 'src/selectors/urlVarsSelector'
import generateNewProgramSource from 'src/utils/generateNewProgramSource'
import parseUrlVars from 'src/utils/parseUrlVars'
import resolveLinkUrl from 'src/utils/resolveLinkUrl'
import {
	setAsPath,
	setUrlVars,
} from 'src/actions/setup'
/* eslint-disable import/no-cycle */
import {
	safeAddProgram,
	safeUpdateProgram,
} from 'src/actions/storage'
/* eslint-enable import/no-cycle */
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
	EDITOR_SET_TEXT_GENERATED_CODE,
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

export const setEditorProgramNameByType = (type, name) => (dispatch) => {
	if (type === 'flow') {
		dispatch(setFlowName(name))
	} else if (type === 'block') {
		dispatch(setBlockName(name))
	} else if (type === 'text') {
		dispatch(setTextName(name))
	}
}
export const setEditorProgramSourceByType = (type, source) => (dispatch) => {
	if (type === 'flow') {
		dispatch(setFlowSource(source))
	} else if (type === 'block') {
		dispatch(setBlockSource(source))
	} else if (type === 'text') {
		dispatch(setTextSource(source))
	}
}
export const setEditorProgramByType = (type, program) => (dispatch) => {
	if (type === 'flow') {
		dispatch(setFlowProgram(program))
	} else if (type === 'block') {
		dispatch(setBlockProgram(program))
	} else if (type === 'text') {
		dispatch(setTextProgram(program))
	}
}
export const resetEditorProgramByType = (type) => (dispatch) => {
	const program = {
		id     : null,
		name   : null,
		source : generateNewProgramSource(type),
	}
	dispatch(setEditorProgramByType(type, program))
}
export const setCurrentEditorProgram = (program) => (dispatch, getState) => {
	const state = getState()
	const type = refEditorTypeSelector()(state)
	dispatch(setEditorProgramByType(type, program))
}
export const resetCurrentEditorProgram = () => (dispatch, getState) => {
	const state = getState()
	const type = refEditorTypeSelector()(state)
	dispatch(resetEditorProgramByType(type))
}
export const saveCurrentEditorProgram = () => async (dispatch, getState) => {
	const state = getState()
	const name = refEditorNameSelector()(state)
	const source = refEditorSourceSelector()(state)
	const type = refEditorTypeSelector()(state)
	const { id } = await dispatch(safeAddProgram(type, name, source))
	if (type === 'flow') {
		dispatch(setFlowId(id))
	} else if (type === 'block') {
		dispatch(setBlockId(id))
	} else if (type === 'text') {
		dispatch(setTextId(id))
	}
	// Update the url
	const { as, href } = resolveLinkUrl(`${Router.asPath.split('?')[0]}?p=${id}`)
	Router.replace(href, as)
	dispatch(setAsPath(as))
	dispatch(setUrlVars(parseUrlVars(as)))

	// If the user is anonymous, warn about how the programs are not saved online
	// if (isAnon) {
	// 	dispatch(safeOpenDialogModal(
	// 		{
	// 			titleKey              : 'ui.dialog.anonymous_save.title',
	// 			descriptionKey        : 'ui.dialog.anonymous_save.description',
	// 			confirmLabelKey       : 'ui.dialog.anonymous_save.confirm',
	// 			descriptionIsMarkdown : true,
	// 			limitWidth            : true,
	// 			displayCancel         : false
	// 		}
	// 	))
	// }
}
export const updateCurrentEditorProgramName = (name) => async (dispatch, getState) => {
	const state = getState()
	const id = refEditorIdSelector()(state)
	const type = refEditorTypeSelector()(state)
	const saved = refEditorSavedSelector()(state)
	if (type === 'flow') {
		dispatch(setFlowName(name))
	} else if (type === 'block') {
		dispatch(setBlockName(name))
	} else if (type === 'text') {
		dispatch(setTextName(name))
	}
	if (saved) {
		const data = { ...storageProgramSelector()(state, { id }) }
		if (data.name !== name) {
			data.name = name
			await dispatch(safeUpdateProgram(id, data))
		}
	}
}
export const updateCurrentEditorProgramSource = (source) => async (dispatch, getState) => {
	const state = getState()
	const id = refEditorIdSelector()(state)
	const type = refEditorTypeSelector()(state)
	const saved = refEditorSavedSelector()(state)
	if (type === 'flow') {
		dispatch(setFlowSource(source))
	} else if (type === 'block') {
		dispatch(setBlockSource(source))
	} else if (type === 'text') {
		dispatch(setTextSource(source))
	}
	if (saved) {
		const data = { ...storageProgramSelector()(state, { id }) }
		if (JSON.stringify(data.source) !== JSON.stringify(source)) {
			data.source = source
			await dispatch(safeUpdateProgram(id, data))
		}
	}
}
export const updateCurrentEditorProgramId = (newId) => async (dispatch, getState) => {
	const state = getState()
	const id = refEditorIdSelector()(state)
	const type = refEditorTypeSelector()(state)
	if (type === 'flow') {
		dispatch(setFlowId(newId))
	} else if (type === 'block') {
		dispatch(setBlockId(newId))
	} else if (type === 'text') {
		dispatch(setTextId(newId))
	}
	// Update the url if needed
	const urlVarProgramId = urlVarsSelector()(getState()).p
	if (id === urlVarProgramId) {
		const { as, href } = resolveLinkUrl(`${Router.asPath.split('?')[0]}?p=${newId}`)
		Router.replace(href, as)
		dispatch(setAsPath(as))
		dispatch(setUrlVars(parseUrlVars(as)))
	}
}
