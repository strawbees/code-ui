import generateAction from 'src/utils/generateAction'
import {
	QBMIDI_SET_LINKS,
	QBMIDI_SET_AVAILABLE,
	QBMIDI_SET_READY,
} from 'src/constants/actionTypes'

export const setQbmidiLinks = generateAction(QBMIDI_SET_LINKS)
export const setQbmidiAvailable = generateAction(QBMIDI_SET_AVAILABLE)
export const setQbmidiReady = generateAction(QBMIDI_SET_READY)
