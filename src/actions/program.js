import Router from 'next/router'
import {
	setFlowName,
	setFlowSource,
	setFlowId,
	setFlowProgram,

	setScratchName,
	setScratchSource,
	setScratchId,
	setScratchProgram,

	setTextName,
	setTextSource,
	setTextId,
	setTextProgram
} from 'src/actions/editor'
import {
	addProgram,
	getProgram,
	updateProgramName,
	updateProgramSource,
	removeProgram
} from 'src/utils/storage'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import editorSelector from 'src/selectors/editorSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import resolveLinkUrl from 'src/utils/resolveLinkUrl'
import generateNewProgramSource from 'src/utils/generateNewProgramSource'

export const resetEditorProgramByType = (type) => (dispatch) => {
	const program = {
		id     : null,
		name   : null,
		source : generateNewProgramSource(type)
	}
	if (type === 'flow') {
		dispatch(setFlowProgram(program))
	} else if (type === 'scratch') {
		dispatch(setScratchProgram(program))
	} else if (type === 'text') {
		dispatch(setTextProgram(program))
	}
}

export const resetCurrentEditorProgram = () => (dispatch, getState) => {
	const state = getState()
	const type = refEditorTypeSelector(state)
	dispatch(resetEditorProgramByType(type))
}

export const saveCurrentEditorProgram = () => async (dispatch, getState) => {
	const state = getState()
	const name = refEditorNameSelector(state)
	const source = refEditorSourceSelector(state)
	const type = refEditorTypeSelector(state)
	const { id } = await addProgram(type, name, source)
	if (type === 'flow') {
		dispatch(setFlowId(id))
	} else if (type === 'scratch') {
		dispatch(setScratchId(id))
	} else if (type === 'text') {
		dispatch(setTextId(id))
	}
}

export const updateCurrentEditorProgramName = (name) => async (dispatch, getState) => {
	const state = getState()
	const id = refEditorIdSelector(state)
	const type = refEditorTypeSelector(state)
	const saved = refEditorSavedSelector(state)
	if (type === 'flow') {
		dispatch(setFlowName(name))
	} else if (type === 'scratch') {
		dispatch(setScratchName(name))
	} else if (type === 'text') {
		dispatch(setTextName(name))
	}
	if (saved) {
		await updateProgramName(id, name)
	}
}

export const updateCurrentEditorProgramSource = (source) => async (dispatch, getState) => {
	const state = getState()
	const id = refEditorIdSelector(state)
	const type = refEditorTypeSelector(state)
	const saved = refEditorSavedSelector(state)
	if (type === 'flow') {
		dispatch(setFlowSource(source))
	} else if (type === 'scratch') {
		dispatch(setScratchSource(source))
	} else if (type === 'text') {
		dispatch(setTextSource(source))
	}
	if (saved) {
		await updateProgramSource(id, source)
	}
}

export const removeProgramByIdAndClearEditor = (id) => async (dispatch, getState) => {
	const state = getState()
	const { type } = await getProgram(id)
	await removeProgram(id)
	const editorId = editorSelector(state)[type].id
	if (editorId === id) {
		dispatch(resetEditorProgramByType(type))
	}
}

export const openProgramByIdAndGoToEditor = (id) => async (dispatch, getState) => {
	const state = getState()

	const rawProgram = await getProgram(id)
	const program = {
		id,
		type   : rawProgram.type,
		name   : rawProgram.name,
		source : rawProgram.source
	}
	const editorUrl = makeStringSelector(`${program.type}.url`)(state)
	const { href, as } = resolveLinkUrl(editorUrl)
	href.query.program = JSON.stringify(program)
	Router.push(href, as)
}

export const openProgramDataAndGoToEditor = (program) => (dispatch, getState) => {
	const state = getState()
	const editorUrl = makeStringSelector(`${program.type}.url`)(state)
	const { href, as } = resolveLinkUrl(editorUrl)
	href.query.program = JSON.stringify(program)
	Router.push(href, as)
}
