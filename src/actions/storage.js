import generateAction from 'src/utils/generateAction'
import { generateUniqueId } from 'src/storage'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'
import {
	updateCurrentEditorProgramName,
	updateCurrentEditorProgramSource,
} from 'src/actions/editor'

import {
	STORAGE_SET_READY,
	STORAGE_SET_STATUS,
	STORAGE_SET_CREDENTIALS,
	STORAGE_SET_TEMP_PROGRAM,
	STORAGE_SET_PROGRAMS,
	STORAGE_ADD_PROGRAM,
	STORAGE_UPDATE_PROGRAM,
	STORAGE_REMOVE_PROGRAM,
	STORAGE_REMOVE_ALL_PROGRAMS
} from 'src/constants/actionTypes'

export const setReady = generateAction(STORAGE_SET_READY)
export const setStatus = generateAction(STORAGE_SET_STATUS)
export const setCredentials = generateAction(STORAGE_SET_CREDENTIALS)
export const setTempProgram = generateAction(STORAGE_SET_TEMP_PROGRAM)
export const setPrograms = generateAction(STORAGE_SET_PROGRAMS)
export const addProgram = generateAction(STORAGE_ADD_PROGRAM)
export const updateProgram = generateAction(STORAGE_UPDATE_PROGRAM)
export const removeProgram = generateAction(STORAGE_REMOVE_PROGRAM)
export const removeAllPrograms = generateAction(STORAGE_REMOVE_ALL_PROGRAMS)

export const safeAddProgram = (type, name, source) => async (dispatch, getState) => {
	const state = getState()
	const credentials = storageCredentialsSelector()(state)
	const id = generateUniqueId(credentials)
	const data = {
		id,
		type,
		name,
		source,
		createdAt : Date.now(),
		updatedAt : Date.now(),
		version   : 0
	}
	dispatch(addProgram({ id, data }))
	// important to return the program, as this will be consumed by other actions
	return data
}

export const safeUpdateProgram = (id, data, externalChange = false) => async (dispatch, getState) => {
	data = {
		...data
	}
	if (!externalChange) {
		data.updatedAt = Date.now()
		data.version += 1
	}
	dispatch(updateProgram({ id, data }))
	const state = getState()
	const editorId = refEditorIdSelector()(state)
	if (externalChange && editorId === id) {
		const editorName = refEditorNameSelector()(state)
		const editorSource = refEditorSourceSelector()(state)
		if (data.name !== editorName) {
			dispatch(updateCurrentEditorProgramName(data.name))
		}

		if (JSON.stringify(data.source) !== JSON.stringify(editorSource)) {
			dispatch(updateCurrentEditorProgramSource(data.source))
		}
	}
}

export const safeRemoveProgram = (id) => async (dispatch) => {
	dispatch(removeProgram({ id }))
}
