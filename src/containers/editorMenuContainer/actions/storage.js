import generateAction from 'src/utils/generateAction'
import {
	STORAGE_SET_READY,
	STORAGE_SET_PROGRAMS,
	STORAGE_ADD_PROGRAM,
	STORAGE_UPDATE_PROGRAM,
	STORAGE_REMOVE_PROGRAM,
	STORAGE_REMOVE_ALL_PROGRAMS
} from 'src/constants/actionTypes'

export const setReady = generateAction(STORAGE_SET_READY)
export const setPrograms = generateAction(STORAGE_SET_PROGRAMS)
export const addProgram = generateAction(STORAGE_ADD_PROGRAM)
export const updateProgram = generateAction(STORAGE_UPDATE_PROGRAM)
export const removeProgram = generateAction(STORAGE_REMOVE_PROGRAM)
export const removeAllPrograms = generateAction(STORAGE_REMOVE_ALL_PROGRAMS)
