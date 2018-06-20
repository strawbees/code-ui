import generateAction from 'src/utils/generateAction'
import {
	getLinkByRuntimeId,
	uploadHexToLink
} from 'quirkbot-midi-interface'
import {
	UPLOADER_START_UPLOAD,
	UPLOADER_SET_ERROR,
	UPLOADER_SET_SUCCESS,
	UPLOADER_CLEAR_ERROR,
} from 'src/constants/actionTypes'

export const startUpload = generateAction(UPLOADER_START_UPLOAD)
export const setUploadError = generateAction(UPLOADER_SET_ERROR)
export const clearUploadError = generateAction(UPLOADER_CLEAR_ERROR)
export const setUploadSuccess = generateAction(UPLOADER_SET_SUCCESS)

export const uploadHex = (runtimeId, hex) => async (dispatch) => {
	dispatch(startUpload({ runtimeId, hex }))
	const link = getLinkByRuntimeId(runtimeId)
	try {
		await uploadHexToLink(link, hex)
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
