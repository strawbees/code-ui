import generateAction from 'src/utils/generateAction'
import {
	QBSERIAL_SET_LINKS,
	QBSERIAL_SET_AVAILABLE,
	QBSERIAL_SET_ALLOWED,
	QBSERIAL_SET_READY,
} from 'src/constants/actionTypes'

export const setQbserialLinks = generateAction(QBSERIAL_SET_LINKS)
export const setQbserialAvailable = generateAction(QBSERIAL_SET_AVAILABLE)
export const setQbserialAllowed = generateAction(QBSERIAL_SET_ALLOWED)
export const setQbserialReady = generateAction(QBSERIAL_SET_READY)
