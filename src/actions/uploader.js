import {
	getLinkByRuntimeId,
	uploadHexToLink
} from 'quirkbot-midi-interface'
import getConfig from 'next/config'
import { generateMethod } from 'src/utils/chromeExtensionApi'
import qbcompoundLinkSelector from 'src/selectors/qbcompoundLinkSelector'
import generateAction from 'src/utils/generateAction'
import { safeOpenModal } from 'src/actions/modal'
import UploaderDependenciesContainer from 'src/containers/uploaderDependenciesContainer'
import {
	UPLOADER_START_UPLOAD,
	UPLOADER_SET_ERROR,
	UPLOADER_SET_SUCCESS,
	UPLOADER_CLEAR_ERROR,
} from 'src/constants/actionTypes'

const {
	publicRuntimeConfig : {
		CHROME_EXTENSION_ID
	}
} = getConfig()

export const startUpload = generateAction(UPLOADER_START_UPLOAD)
export const setUploadError = generateAction(UPLOADER_SET_ERROR)
export const clearUploadError = generateAction(UPLOADER_CLEAR_ERROR)
export const setUploadSuccess = generateAction(UPLOADER_SET_SUCCESS)

export const uploadHex = (runtimeId, hex) => async (dispatch, getState) => {
	dispatch(startUpload({ runtimeId, hex }))

	const testLink = qbcompoundLinkSelector()(getState(), { runtimeId })
	let uploadFn

	// figure out if this runtime id belongs to a midi or serial interface,
	// as the upload process is quite different
	if (testLink.hardwareInterface === 'midi') {
		uploadFn = async () => uploadHexToLink(getLinkByRuntimeId(runtimeId), hex)
	} else {
		const serialUpload = generateMethod('upload', CHROME_EXTENSION_ID)
		uploadFn = async () => serialUpload(testLink.uuid, hex)
	}

	try {
		await uploadFn()
		dispatch(setUploadSuccess({ runtimeId, hex }))
	} catch ({ name : errorName, message : errorMessage }) {
		let error
		switch (errorMessage) {
			default:
				error = 'UNHANDLED'
		}
		dispatch(setUploadError({ runtimeId, hex, error }))
	}
}

export const modalOpenUploaderDependencies = () => async (dispatch) => {
	return dispatch(safeOpenModal(
		<UploaderDependenciesContainer />
	))
}
