import { compileCode } from 'src/actions/compiler'
import {
	safeOpenModal,
	safeOpenDialogModal
} from 'src/actions/modal'
import {
	safeAddProgram,
	safeRemoveProgram,
} from 'src/actions/storage'
import {
	resetEditorProgramByType
} from 'src/actions/editor'

import storageFormatedProgramSelector from 'src/selectors/storageFormatedProgramSelector'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'
import editorSelector from 'src/selectors/editorSelector'
import storageProgramSelector from 'src/selectors/storageProgramSelector'
import FormInput from 'src/components/formInput'
import UploadAreaContainer from 'src/containers/uploadAreaContainer'


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
