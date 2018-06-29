import Router from 'next/router'

import { compileCode } from 'src/actions/compiler'
import {
	setAsPath,
	setUrlVars,
} from 'src/actions/setup'
import {
	setFlowName,
	setFlowSource,
	setFlowId,
	setFlowProgram,

	setBlockName,
	setBlockSource,
	setBlockId,
	setBlockProgram,

	setTextName,
	setTextSource,
	setTextId,
	setTextProgram
} from 'src/actions/editor'
import {
	safeOpenModal,
	safeOpenDialogModal
} from 'src/actions/modal'
import {
	safeAddProgram,
	safeUpdateProgram,
	safeRemoveProgram,
} from 'src/actions/storage'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import storageFormatedProgramSelector from 'src/selectors/storageFormatedProgramSelector'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'
import editorSelector from 'src/selectors/editorSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import storageProgramSelector from 'src/selectors/storageProgramSelector'
import generateNewProgramSource from 'src/utils/generateNewProgramSource'
import parseUrlVars from 'src/utils/parseUrlVars'
import resolveLinkUrl from 'src/utils/resolveLinkUrl'
import FormInput from 'src/components/formInput'
import UploadAreaContainer from 'src/containers/uploadAreaContainer'

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
		source : generateNewProgramSource(type)
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
		data.name = name
		await dispatch(safeUpdateProgram(id, data))
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
		data.source = source
		await dispatch(safeUpdateProgram(id, data))
	}
}
export const duplicateProgramById = (id, newName) => async (dispatch, getState) => {
	const state = getState()
	const program = storageProgramSelector()(state, { id })
	return dispatch(duplicateProgramData(program, newName))
}
export const duplicateProgramData = (program, newName) => async (dispatch) => {
	const { type, source } = program
	return dispatch(safeAddProgram(type, newName, source))
}
export const removeProgramByIdAndClearEditor = (id) => async (dispatch, getState) => {
	const state = getState()
	const { type } = storageProgramSelector()(state, { id })
	await dispatch(safeRemoveProgram(id))
	const editorId = editorSelector()(state)[type].id
	if (editorId === id) {
		dispatch(resetEditorProgramByType(type))
	}
}

// Modal actions
export const modalRemoveProgram = (id) => async (dispatch) => {
	const onConfirm = () => dispatch(removeProgramByIdAndClearEditor(id))
	// important to return the dispatch, so this can be used as a promise
	return dispatch(safeOpenDialogModal(
		{
			titleKey        : 'ui.dialog.remove.title',
			descriptionKey  : 'ui.dialog.remove.description',
			confirmLabelKey : 'ui.dialog.remove.confirm',
			onConfirm
		}
	))
}
export const modalDuplicateProgramById = (id) => async (dispatch, getState) => {
	const state = getState()
	const { name } = storageFormatedProgramSelector()(state, { id })
	const allPrograms = storageProgramsSelector()(state)
	const allProgramsByName = Object.keys(allPrograms).reduce((acc, programId) => {
		const program = allPrograms[programId]
		acc[program.name] = program
		return acc
	}, {})
	const regex = / \(([0-9]{1,2})\)$/
	const base = name.replace(regex, '')
	let count = 2
	const composeName = () => `${base} (${count})`
	let newName = composeName()
	while (allProgramsByName[newName]) {
		count++
		newName = composeName()
	}
	const onConfirm = () => {
		dispatch(duplicateProgramById(id, newName))
	}
	return dispatch(safeOpenDialogModal(
		{
			titleKey        : 'ui.dialog.duplicate.title',
			confirmLabelKey : 'ui.dialog.duplicate.confirm',
			onConfirm
		},
		<FormInput
			defaultValue={newName}
			labelKey={'ui.dialog.duplicate.field'}
			onChange={e => newName = e}
		/>,
	))
}
export const modalDuplicateProgramData = (program) => async (dispatch) => {
	const { name } = program

	let newName = `${name} copy`
	const onConfirm = () => dispatch(duplicateProgramData(program, newName))
	return dispatch(safeOpenDialogModal(
		{
			titleKey        : 'ui.dialog.duplicate.title',
			confirmLabelKey : 'ui.editor.duplicate',
			onConfirm
		},
		<FormInput
			defaultValue={newName}
			labelKey={'modal.program.duplicate-confirmation'}
			onChange={e => newName = e}
		/>,
	))
}
export const modalUploadCode = (code) => async (dispatch) => {
	dispatch(compileCode(code))
	return dispatch(safeOpenModal(
		<UploadAreaContainer
			code={code}
		/>
	))
}
