import generateAction from 'src/utils/generateAction'
import {
	generateUniqueId,
	resolveBackendFromBackendName,
	resolveBackendFromCredentials,
	resolveBackendFromProgramId,
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
	safeOpenDialogModal,
	closeModal,
} from 'src/actions/modal'
import {
	collapseAccountSettings,
} from 'src/actions/ui'
import * as browserStorage from 'src/utils/browserStorage'
import { fireGlobalEvent } from 'src/utils/globalEvents'
import StrawbeesCloudSignin from 'src/components/strawbeesCloudSignin'
import StrawbeesCloudSignup from 'src/components/strawbeesCloudSignup'
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
	STORAGE_SET_PUBLIC_PROFILE,
	STORAGE_CLEAR
} from 'src/constants/actionTypes'
import {
	READY,
	SYNCING,
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
export const setPublicProfile = generateAction(STORAGE_SET_PUBLIC_PROFILE)
export const addProgram = generateAction(STORAGE_ADD_PROGRAM)
export const updateProgram = generateAction(STORAGE_UPDATE_PROGRAM)
export const removeProgram = generateAction(STORAGE_REMOVE_PROGRAM)
export const removeAllPrograms = generateAction(STORAGE_REMOVE_ALL_PROGRAMS)
export const clearStorage = generateAction(STORAGE_CLEAR)

export const safeClearLoggedInData = () => async (dispatch) => {
	dispatch(setCredentials(null))
	dispatch(setUser(null))
	dispatch(setPrograms({}))
	dispatch(setRemoteMirror(null))
	dispatch(restoreAnonPrograms())
}

export const backupAnonPrograms = () => async (dispatch, getState) => {
	const programs = storageProgramsSelector()(getState())
	const localPrograms = Object.keys(programs)
		.filter(id => resolveBackendFromProgramId(id).name === 'local')
		.reduce((acc, id) => {
			acc[id] = programs[id]
			return acc
		}, {})
	browserStorage.set('anonProgramsBackup', 'data', localPrograms)
}

export const restoreAnonPrograms = () => async (dispatch, getState) => {
	const state = getState()
	const credentials = storageCredentialsSelector()(state)
	const programs = browserStorage.get('anonProgramsBackup', 'data')
	if (credentials || !programs) {
		return
	}
	browserStorage.remove('anonProgramsBackup', 'data')
	dispatch(setPrograms(programs))
}

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
			dispatch(safeClearLoggedInData())
			return
		}
		// other errors (maybe network) we keep, and don't logout yet
		// eslint-disable-next-line no-console
		console.log('Error syncing storage', error)
		dispatch(setStatus(ERROR))
	}
}

const onModalConnect = ({ credentials, user }) => async (dispatch, getState) => {
	const programs = storageProgramsSelector()(getState())
	await dispatch(backupAnonPrograms(programs))
	if (Object.keys(programs).length) {
		try {
			await dispatch(safeOpenDialogModal({
				titleKey        : 'ui.dialog.anonymous_copy_programs.title',
				descriptionKey  : 'ui.dialog.anonymous_copy_programs.description',
				confirmLabelKey : 'ui.dialog.anonymous_copy_programs.confirm',
				cancelLabelKey  : 'ui.dialog.anonymous_copy_programs.cancel',
				limitWidth      : true
			}))
			dispatch(setRemoteMirror(null))
			fireGlobalEvent('track-event', {
				category : 'user',
				action   : 'copy guest programs',
				label    : 'modal'
			})
		} catch (e) {
			fireGlobalEvent('track-event', {
				category : 'user',
				action   : 'discard guest programs',
				label    : 'modal'
			})
		}
	}
	dispatch(setCredentials(credentials))
	dispatch(setUser(user))
	dispatch(closeModal())
	dispatch(collapseAccountSettings())
}

export const modalSignup = (backendName) => async (dispatch) => {
	if (!backendName) {
		return
	}
	const backend = resolveBackendFromBackendName(backendName)
	let SignupComponent
	switch (backend.name) {
		case 'strawbees':
			SignupComponent = StrawbeesCloudSignup
			break
		default:
	}
	dispatch(safeOpenDialogModal(
		{
			titleKey       : 'ui.sb_cloud.signup.title',
			displayConfirm : false,
			displayCancel  : false
		},
		<SignupComponent
			onSignup={async (values) => {
				const result = await backend.signup(values)
				fireGlobalEvent('track-event', {
					category : 'user',
					action   : 'sign-up-complete',
					label    : 'modal'
				})
				dispatch(onModalConnect(result))
			}}
		/>
	))
}

export const modalSignin = (backendName) => async (dispatch) => {
	if (!backendName) {
		return
	}
	const backend = resolveBackendFromBackendName(backendName)
	let SigninComponent
	switch (backend.name) {
		case 'strawbees':
			SigninComponent = StrawbeesCloudSignin
			break
		default:
	}
	dispatch(safeOpenDialogModal(
		{
			titleKey       : 'ui.sb_cloud.signin.title',
			displayConfirm : false,
			displayCancel  : false
		},
		<SigninComponent
			onSignin={async (values) => {
				const result = await backend.signin(values)
				fireGlobalEvent('track-event', {
					category : 'user',
					action   : 'sign-in-complete',
					label    : 'modal'
				})
				dispatch(onModalConnect(result))
			}}
			onForgotPassword={async (values) => {
				try {
					const result = await backend.forgotPassword(values)
					fireGlobalEvent('track-event', {
						category : 'user',
						action   : 'forgot-password-complete',
						label    : 'modal'
					})
					console.log('todo: do something with result', result)
				} catch (error) {
					throw error
				}
			}}
		/>
	))
}
