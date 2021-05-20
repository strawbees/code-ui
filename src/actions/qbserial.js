import {
	requestAccess,
	resetAccess,
} from 'src/serial'
import compilerBootloaderUpdaterHexSelector from 'src/selectors/compilerBootloaderUpdaterHexSelector'
import compilerFactoryCodeHexSelector from 'src/selectors/compilerFactoryCodeHexSelector'
import generateAction from 'src/utils/generateAction'
import {
	QBSERIAL_SET_LINKS,
	QBSERIAL_SET_AVAILABLE,
	QBSERIAL_SET_ALLOWED,
	QBSERIAL_SET_ALLOWED_STATUS,
	QBSERIAL_SET_READY,
} from 'src/constants/actionTypes'

export const setQbserialLinks = generateAction(QBSERIAL_SET_LINKS)
export const setQbserialAvailable = generateAction(QBSERIAL_SET_AVAILABLE)
export const setQbserialAllowed = generateAction(QBSERIAL_SET_ALLOWED)
export const setQbserialAllowedStatus = generateAction(QBSERIAL_SET_ALLOWED_STATUS)
export const setQbserialReady = generateAction(QBSERIAL_SET_READY)

export const requestWebSerialAccess = () => async (dispatch, getState) => {
	const state = getState()
	const bootloaderUpdaterHex = compilerBootloaderUpdaterHexSelector()(state)
	const factoryCodeHex = compilerFactoryCodeHexSelector()(state)
	await requestAccess(bootloaderUpdaterHex, factoryCodeHex)
}

export const resetWebSerialAccess = () => async () => {
	await resetAccess()
}
