import generateAction from 'src/utils/generateAction'
import { generateUniqueId } from 'src/storage'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'
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

export const safeUpdateProgram = (id, data) => async (dispatch) => {
	dispatch(updateProgram({ id, data }))
}

export const safeRemoveProgram = (id) => async (dispatch) => {
	dispatch(removeProgram({ id }))
}
