import { compileCode } from 'src/actions/compiler'
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
	openModal,
	openDialogModal
} from 'src/actions/modal'
import {
	safeAddProgram,
	updateProgram,
	removeProgram,
} from 'src/actions/storage'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import formatedProgramSelector from 'src/selectors/storageFormatedProgramSelector'
import editorSelector from 'src/selectors/editorSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import storageProgramSelector from 'src/selectors/storageProgramSelector'
import generateNewProgramSource from 'src/utils/generateNewProgramSource'
import FormInput from 'src/components/formInput'
import S from 'src/containers/sManager'
import UploadAreaContainer from 'src/containers/uploadAreaContainer'

export const resetEditorProgramByType = (type) => (dispatch) => {
	const program = {
		id     : null,
		name   : null,
		source : generateNewProgramSource(type)
	}
	if (type === 'flow') {
		dispatch(setFlowProgram(program))
	} else if (type === 'block') {
		dispatch(setBlockProgram(program))
	} else if (type === 'text') {
		dispatch(setTextProgram(program))
	}
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
		const data = { ...storageProgramSelector(state)({ id }) }
		data.name = name
		await updateProgram(id, data)
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
		const data = { ...storageProgramSelector(state)({ id }) }
		data.source = source
		await updateProgram(id, data)
	}
}
export const duplicateProgramById = (id, newName) => async (dispatch, getState) => {
	const state = getState()
	const program = storageProgramSelector(state)({ id })
	dispatch(duplicateProgramData(program, newName))
}
export const duplicateProgramData = (program, newName) => async () => {
	const { type, source } = program
	await safeAddProgram(
		type,
		newName,
		source
	)
}
export const removeProgramByIdAndClearEditor = (id) => async (dispatch, getState) => {
	const state = getState()
	const { type } = storageProgramSelector(state)({ id })
	dispatch(removeProgram(id))
	const editorId = editorSelector()(state)[type].id
	if (editorId === id) {
		dispatch(resetEditorProgramByType(type))
	}
}


// Modal actions
export const modalRemoveProgram = (id) => async (dispatch) => {
	dispatch(openDialogModal(
		<S value='modal.program.remove-confirmation'/>,
		{
			confirmLabelKey : 'ui.editor.remove',
			onConfirm       : () => dispatch(removeProgramByIdAndClearEditor(id))
		}
	))
}
export const modalDuplicateProgramById = (id) => async (dispatch, getState) => {
	const state = getState()
	const { name } = formatedProgramSelector()(state, { id })

	let newName = `${name} copy`
	dispatch(openDialogModal(
		<FormInput
			defaultValue={newName}
			labelKey={'modal.program.duplicate-confirmation'}
			onChange={e => newName = e}
		/>,
		{
			confirmLabelKey : 'ui.editor.duplicate',
			onConfirm       : () => dispatch(duplicateProgramById(id, newName))
		}
	))
}
export const modalDuplicateProgramData = (program) => async (dispatch) => {
	const { name } = program

	let newName = `${name} copy`
	dispatch(openDialogModal(
		<FormInput
			defaultValue={newName}
			labelKey={'modal.program.duplicate-confirmation'}
			onChange={e => newName = e}
		/>,
		{
			confirmLabelKey : 'ui.editor.duplicate',
			onConfirm       : () => dispatch(duplicateProgramData(program, newName))
		}
	))
}
export const modalUploadCode = (code) => async (dispatch) => {
	dispatch(compileCode(code))
	dispatch(openModal(
		<UploadAreaContainer
			code={code}
		/>
	))
}
