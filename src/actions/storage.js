import {
	STORAGE_ADD_PROGRAM,
	STORAGE_UPDATE_PROGRAM,
	STORAGE_REMOVE_PROGRAM,
	STORAGE_REMOVE_ALL_PROGRAMS
} from 'src/constants/actionTypes'

export const addProgram = payload => ({
	type : STORAGE_ADD_PROGRAM,
	payload
})
export const updateProgram = payload => ({
	type : STORAGE_UPDATE_PROGRAM,
	payload
})
export const removeProgram = payload => ({
	type : STORAGE_REMOVE_PROGRAM,
	payload
})
export const removeAllPrograms = payload => ({
	type : STORAGE_REMOVE_ALL_PROGRAMS,
	payload
})
