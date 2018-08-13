import generateAction from 'src/utils/generateAction'
import {
	generateUniqueId,
	resolveBackendFromCredentials,
} from 'src/storage'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'
import storageUserSelector from 'src/selectors/storageUserSelector'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'
import storageRemoteMirrorSelector from 'src/selectors/storageRemoteMirrorSelector'
import {
	updateCurrentEditorProgramName,
	updateCurrentEditorProgramSource,
	updateCurrentEditorProgramId,
} from 'src/actions/editor'
import {
	STORAGE_SET_STATUS,
	STORAGE_SET_CREDENTIALS,
	STORAGE_SET_USER,
	STORAGE_SET_PROGRAMS,
	STORAGE_ADD_PROGRAM,
	STORAGE_UPDATE_PROGRAM,
	STORAGE_REMOVE_PROGRAM,
	STORAGE_REMOVE_ALL_PROGRAMS,
	STORAGE_SET_REMOTE_MIRROR,
	STORAGE_CLEAR
} from 'src/constants/actionTypes'
import {
	READY,
	SYNCING,
	NEEDS_SYNC,
	ERROR,
} from 'src/constants/storage'

const safeBackendCall = (call, options) => async (dispatch, getState) => {
	// get the credentials and resolve the backend
	let credentials = storageCredentialsSelector()(getState())
	const backend = resolveBackendFromCredentials(credentials)

	// have an initial try...
	try {
		const result = await backend[call](credentials, options)
		return result
	} catch (error) {
		// if we get genetic error, throw it forward...
		if (error.message !== 'NOT_AUTHORIZED') {
			throw error
		}
	}
	// if we got here, we got an authorization problem, so refresh the
	// credentials and try again.
	credentials = await backend.refreshCredentials(credentials)
	dispatch(setCredentials(credentials))
	// Have anohter try
	return backend[call](credentials, options)
}

export const setStatus = generateAction(STORAGE_SET_STATUS)
export const setCredentials = generateAction(STORAGE_SET_CREDENTIALS)
export const setUser = generateAction(STORAGE_SET_USER)
export const setPrograms = generateAction(STORAGE_SET_PROGRAMS)
export const setRemoteMirror = generateAction(STORAGE_SET_REMOTE_MIRROR)
export const addProgram = generateAction(STORAGE_ADD_PROGRAM)
export const updateProgram = generateAction(STORAGE_UPDATE_PROGRAM)
export const removeProgram = generateAction(STORAGE_REMOVE_PROGRAM)
export const removeAllPrograms = generateAction(STORAGE_REMOVE_ALL_PROGRAMS)
export const clearStorage = generateAction(STORAGE_CLEAR)


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

export const safeSync = () => async (dispatch, getState) => {


	const sync = async () => {
		const data = {
			user         : storageUserSelector()(getState()),
			programs     : storageProgramsSelector()(getState()),
			remoteMirror : storageRemoteMirrorSelector()(getState()),
		}
		const result = await dispatch(safeBackendCall('sync', data))
		if (JSON.stringify(data.programs) !== JSON.stringify(storageProgramsSelector()(getState()))) {
			return null
		}
		return result
	}

	dispatch(setStatus(SYNCING))
	try {
		let result
		while (!result) {
			result = await sync()
		}
		const {
			mirror,
			programIdChanges
		} = result

		// update the storage based on the results
		dispatch(setRemoteMirror(mirror))
		dispatch(setUser(mirror.user))
		dispatch(setPrograms(mirror.programs))

		// if there are programs with updated ids, check if one its not currently
		// loaded in to the editor. If so, update the id
		const editorId = refEditorIdSelector()(getState())
		const newEditorId = programIdChanges[editorId]
		if (newEditorId) {
			dispatch(updateCurrentEditorProgramId(newEditorId))
		}
		// now force update the source of the current editor program
		if (mirror.programs[editorId]) {
			dispatch(updateCurrentEditorProgramSource(mirror.programs[editorId].source))
		}
		dispatch(setStatus(READY))
	} catch (error) {
		// if we get an authorization error, we have no choice but logout
		if (error.message === 'NOT_AUTHORIZED') {
			dispatch(clearStorage())
			return
		}
		// other errors (maybe network) we keep, and don't logout yet
		// eslint-disable-next-line no-console
		console.log('Error syncing storage', error)
		dispatch(setStatus(ERROR))
	}
}
